import axios from "axios";
import { FC, useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import CatPost from "./CatPost";
import Post from "./Post";

type PostType = {
  cat: string;
  createdAt: string;
  desc: string;
  img: string;
  title: string;
  uid: {
    _id: string;
    username: string;
    email: string;
  };
  updatedAt: string;
  __v: number;
  _id: string;
};

// Define the type for the data returned from the API
type ApiResponse = PostType[];

type PostsProps = {
  relcat?: string;
  postId?: string;
};

const Posts: FC<PostsProps> = ({ relcat, postId }) => {
  const url = relcat
    ? `https://blogts-node-api.onrender.com/posts?cat=${relcat}&postId=${postId}`
    : "https://blogts-node-api.onrender.com/posts";

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<ApiResponse>({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(url, { withCredentials: true });
      return data;
    },
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return <h1>There is an Error!</h1>;
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
