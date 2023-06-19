import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { User } from "../../types/user";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

// interface UsersState extends Array<User> {}
type UsersState = Array<User>;

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    const response: AxiosResponse<User[]> = await axios.get(USERS_URL);

    return response.data;
  }
);

const initialState: UsersState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllUsers = (state: { users: UsersState }): UsersState =>
  state.users;

export const selectUserById = (
  state: { users: UsersState },
  userId: number
): User | undefined => state.users.find((user) => user.id === userId);

export default usersSlice.reducer;
