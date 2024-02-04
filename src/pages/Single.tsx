import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import EditModal from "../components/EditModel";
import Menu from "../components/Menu";
import { AuthContext } from "../context/authContext";
import { PostType } from "../types/types";

const Single = () => {
  const [showmodel, setshowmodel] = useState<boolean>(false);

  const postId = useLocation().pathname.split("/")[1];

  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<PostType>({
    queryKey: ["singlepost", postId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`,
        {
          withCredentials: true,
        }
      );
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/posts/${id}`,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      toast.success("Successfully Deleted!");
    },
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <h1 className="container  p-4 flex mx-auto">Loading</h1>;
  }

  if (isError) {
    return <h1 className="container  p-4 flex mx-auto">There is an Error</h1>;
  }

  const getText = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="container p-4 flex mx-auto">
      <div className="w-full md:px-8 flex flex-col gap-6 md:gap-8 lg:w-4/6">
        <div className="flex">
          <img
            src={post?.img}
            className="w-[800px] h-[300px] md:h-[500px] object-cover"
            alt=""
          />
        </div>

        <div className="">
          <h1 className="text-2xl font-bold mb-6 md:text-4xl md:mb-8">
            {post?.title}
          </h1>
          <div className="text-justify">{getText(post?.desc as string)}</div>
        </div>
        <div className=" flex justify-between items-center">
          <div className=" flex flex-col">
            <span className="font-medium">Author: {post?.uid.username}</span>
            <span className="font-medium">Catagory: {post?.cat}</span>
          </div>
          {currentUser?.username === post?.uid.username ? (
            <div className="flex flex-row-reverse gap-2 items-center">
              <button
                className="w-fit text-3xl text-red-400  rounded-sm"
                onClick={() => handleDelete(post?._id as string)}
              >
                <MdDelete />
              </button>
              <button
                className=" w-fit text-2xl text-green-700  rounded-sm"
                onClick={() => setshowmodel(true)}
              >
                <FaEdit />
              </button>
            </div>
          ) : null}
        </div>
        {showmodel && (
          <EditModal setshowmodel={setshowmodel} postId={post?._id as string} />
        )}
      </div>
      {post?.cat && <Menu cat={post?.cat} postId={post?._id} />}
    </div>
  );
};

export default Single;
