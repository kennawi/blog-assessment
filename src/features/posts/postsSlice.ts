import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
import { RootState } from "../../app/store";
import { Post } from "../../types/post";
import produce, { Draft } from "immer";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  pageNum: number;
  hasNextPage: boolean;
  searchQuery: string;
  searchResults: Post[];
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
  pageNum: 1,
  hasNextPage: false,
  searchQuery: "",
  searchResults: [],
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (arg: { pageNum?: number; signal?: AbortSignal } = {}) => {
    const { pageNum, signal } = arg;

    const url = pageNum ? `${POSTS_URL}?_page=${pageNum}&_limit=10` : POSTS_URL;
    const response = await axios.get<Post[]>(url, { signal });
    return response.data;
  }
);

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: Omit<Post, "id" | "date">) => {
    const response = await axios.post<Post>(POSTS_URL, initialPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost: Post) => {
    const { id } = initialPost;
    try {
      const response = await axios.put<Post>(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (err) {
      return (err as Error).message;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost: Post) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return (err as Error).message;
    }
  }
);

export const searchPosts = createAsyncThunk(
  "posts/searchPosts",
  async (searchQuery: string) => {
    const response = await axios.get<Post[]>(`${POSTS_URL}?q=${searchQuery}`);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    pageSet: (state, action: PayloadAction<number>) => {
      state.pageNum = action.payload;
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedPosts = action.payload.map((post: Post) => {
          // Generate a dummy date for each loaded post
          let min = 1;
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          return post;
        });
        state.hasNextPage = Boolean(loadedPosts.length);
        state.posts = [...state.posts, ...loadedPosts];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        const sortedPosts = [...state.posts].sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        state.posts = produce(state.posts, (draft: Draft<Post[]>) => {
          const updatedPosts = draft.map((post) => {
            if (post.id !== id) {
              return post;
            }
            return Object.assign({}, post, action.payload);
          });
          return updatedPosts;
        });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const updatedPosts = state.posts.filter((post) => post.id !== id);
        state.posts = updatedPosts;
      })
      .addCase(searchPosts.pending, (state) => {
        state.status = "loading";
        state.searchResults = [];
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
        state.searchResults = [];
      });
  },
});

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;
export const getSearchResults = (state: RootState) => state.posts.searchResults;

export const selectPostById = (state: RootState, postId: number) =>
  state.posts.posts.find((post) => post.id === postId);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state: { posts: PostsState }, userId: number) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const selectSortedPosts = createSelector(selectAllPosts, (posts) => {
  return posts.slice().sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (a.date && !b.date) {
      return -1; // a has a date, b does not, so a should come before b
    } else if (!a.date && b.date) {
      return 1; // b has a date, a does not, so b should come before a
    } else {
      return 0; // both a and b do not have dates, so no sorting needed
    }
  });
});

export const { pageSet, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
