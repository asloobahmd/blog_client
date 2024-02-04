import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { ApiResponse } from "../types/types";
import CatPost from "./CatPost";
import Post from "./Post";

interface PostsProps {
  relcat?: string;
  postId?: string;
}

const Posts: FC<PostsProps> = ({ relcat, postId }) => {
  const url = relcat
    ? `${
        import.meta.env.VITE_API_BASE_URL
      }/posts?cat=${relcat}&postId=${postId}`
    : `${import.meta.env.VITE_API_BASE_URL}/posts`;

  const queryKey = relcat ? ["posts", relcat, postId] : ["posts"];

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<ApiResponse>({
    queryKey: queryKey,
    queryFn: async () => {
      const { data } = await axios.get(url, { withCredentials: true });
      return data;
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>There is an Error!</h1>;
  }

  if (posts?.length === 0) {
    return <h1>No Posts Available</h1>;
  }

  const containerClass = relcat ? "" : "pt-6 md:p-6"; // Conditionally set the class

  return (
    <div className={containerClass}>
      {posts && posts.length > 0
        ? posts.map((post) => {
            if (!relcat) {
              return <Post key={post._id} post={post} />;
            }
            return <CatPost key={post._id} post={post} />;
          })
        : null}
    </div>
  );
};

export default Posts;
