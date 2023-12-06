import React, { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/authContext";

type PostProps = {
  post: {
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
};

const getText = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const val = doc.body.textContent;
  return truncatedText(val as string, 300);
};

const truncatedText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...  ` : text;
};

const Post: FC<PostProps> = ({ post }) => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div className="items-center mx-auto flex flex-col gap-6 mb-16 md:flex-row md:mb-12 md:gap-4">
      <Toaster />
      <div className="w-full md:w-1/2  flex justify-center items-center">
        <img
          className="w-[500px] h-[300px] object-cover"
          src={post.img}
          alt=""
        />
      </div>
      <div className="flex flex-col justify-between w-full gap-6 md:gap-6 md:w-1/2 ">
        <h1 className="text-3xl text-center font-bold md:text-left">
          {post.title}
        </h1>
        <div className=" text-center md:text-justify">
          {getText(post.desc)}{" "}
          {post.desc.length > 500 ? (
            <span className="font-semibold">More</span>
          ) : null}
        </div>
        <Link to={currentUser ? `/${post._id}` : "/"}>
          <button
            onClick={() => {
              if (!currentUser) {
                toast((t) => (
                  <span className="flex gap-3 justify-between items-center">
                    <p>Login First!</p>
                    <button
                      onClick={() => navigate("/login")}
                      className="py-1 px-2 bg-red-400 text-white rounded-sm"
                    >
                      Login
                    </button>
                  </span>
                ));
              }
            }}
            className="w-fit ml-[50%] -translate-x-[50%] md:ml-0 md:-translate-x-0 bg-sky-200 hover:bg-sky-500 hover:text-white p-2 px-4 rounded-sm"
          >
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Post;
