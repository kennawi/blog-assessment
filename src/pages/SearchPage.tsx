import SearchInput from "../components/Inputs/SearchInput";
import PostCard from "../features/posts/PostCard";
import { useAppSelector } from "../app/hooks";
import Container from "../components/Layout/Container";

const SearchPage = () => {
  const searchResults = useAppSelector((state) => state.posts.searchResults);

  return (
    <Container>
      <SearchInput />
      {searchResults.length > 0 ? (
        searchResults.map((post) => (
          <div key={post.id}>
            <PostCard
              id={post?.id}
              title={post?.title}
              description={post?.body}
              userId={post?.userId}
              timestamp={post?.date}
            />
          </div>
        ))
      ) : (
        <h1 className="text-white text-3xl">No search results found.</h1>
      )}
    </Container>
  );
};

export default SearchPage;
