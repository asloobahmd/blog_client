import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import { addPostData, writePostProps } from "../types/types";
import { addPostForm } from "../utils/addpostUtils";
import toast, { Toaster } from "react-hot-toast";

type EditModel = {
  setshowmodel: (val: boolean) => void;
  postId: string;
};

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

const EditModal: FC<EditModel> = ({ setshowmodel, postId }) => {
  const [desc, setDesc] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [cat, setCat] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<PostType>({
    queryKey: ["singlepost"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://blogts-node-api.onrender.com/posts/${postId}`,
        {
          withCredentials: true,
        }
      );
      return data;
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (post) {
      setDesc(post.desc);
      setTitle(post.title);
      setCat(post.cat);
    }
  }, [post]);

  const editPostMutation = useMutation({
    mutationFn: async (newPost: writePostProps) => {
      return await axios.put(
        `https://blogts-node-api.onrender.com/posts/${postId}`,
        newPost,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["singlepost"] });
      setDesc("");
      setTitle("");
      setCat("");
      // Close the modal
      setshowmodel(false);
    },
  });

  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    await setFileToBase(file);
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
  };

  const upload = async (image: string) => {
    try {
      const res = await axios.post(
        "https://blogts-node-api.onrender.com/imgupload",
        {
          image,
        }
      );
      return res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (data: addPostData) => {
    if (desc === `<p><br></p>` || desc === "")
      return toast.error("Please Enter text");

    if (!image) return toast.error("Please Select an Image");

    // Upload image
    const imgName = await upload(image);

    const newPost = {
      title,
      desc,
      cat,
      img: imgName,
    };

    toast.promise(editPostMutation.mutateAsync(newPost), {
      loading: "Saving...",
      success: <b>Post Updated!</b>,
      error: <b>Could not save.</b>,
    });

    // Reset input fields
    setDesc("");
    setTitle("");
    setCat("");
  };

  const { register, handleSubmit, errors } = addPostForm();

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60">
      <div className="container absolute py-4  bg-white p-4 w-[360px] md:w-[600px] flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:flex-row gap-4  mx-auto">
        <button
          className="absolute top-4 left-4 bg-red-400 text-2xl border-1 p-2"
          onClick={() => setshowmodel(false)}
        >
          x
        </button>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="container flex flex-col md:flex-row gap-5 mt-14 mb-4 mx-auto"
        >
          <div className="flex md:px-4 gap-4 flex-col w-full md:w-4/6 ">
            <input
              type="text"
              placeholder="Title..."
              className="border-[1px] outline-none border-gray-400 p-2"
              {...register("title")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-red-500">{errors.title?.message}</p>
            <div className="h-[250px] md:h-[400px] relative">
              <ReactQuill
                theme="snow"
                onChange={setDesc}
                value={desc}
                className=" h-[180px] md:h-[350px]"
              />
            </div>
          </div>
          <div className="flex md:px-4 flex-col w-full md:w-2/6 gap-4 md:gap-4">
            <div>
              <label
                htmlFor="img"
                className="text-xl font-semibold text-blue-400 cursor-pointer"
              >
                Upload Image
              </label>
              <input type="file" id="img" hidden onChange={handleImage} />
            </div>
            <select
              id=""
              className="outline-none border-[1px] border-gray-400 cursor-pointer p-2"
              {...register("cat")}
              defaultValue={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              <option value={cat} disabled>
                {cat}
              </option>
              <option value="Technology">Technology</option>
              <option value="Health and Wealth">Health and Wellness</option>
              <option value="Travel and Lifestyle">Travel and Lifestyle</option>
              <option value="Sports">Sports</option>
              <option value="Food and Cooking">Food and Cooking</option>
              <option value="Business and Finance">Business and Finance</option>
              <option value="Science">Science</option>
              <option value="Art and Culture">Arts and Culture</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            <p className="text-red-500">{errors.cat?.message}</p>

            <button className="self-start p-2 px-4 bg-green-200 rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
