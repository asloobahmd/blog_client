import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { addPostData, writePostProps } from "../types/types";
import useFormHook from "../utils/useFormHook";
import { createPostSchema } from "../utils/validationSchema";

const Write = () => {
  const [desc, setdesc] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [buttonDissable, setButtonDissable] = useState<boolean>(false);

  const navigate = useNavigate();

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
        `${import.meta.env.VITE_API_BASE_URL}/imgupload`,
        {
          image,
        }
      );
      return res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const { register, handleSubmit, errors, reset } =
    useFormHook<addPostData>(createPostSchema);

  const addPostMutation = useMutation({
    mutationFn: async (newPost: writePostProps) => {
      return await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/posts`,
        newPost,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      toast.success("Successfully Posted!");
    },
  });

  const submitHandler = async (data: addPostData) => {
    if (desc === `<p><br></p>` || desc === "")
      return toast.error("Please Enter text");

    if (!image) return toast.error("Please Select an Image");

    setButtonDissable(true);

    const imgName = await upload(image);

    const newPost = {
      title: data.title,
      desc,
      cat: data.cat,
      img: imgName,
    };

    toast.promise(addPostMutation.mutateAsync(newPost), {
      loading: "Saving...",
      success: <b>Post Updated!</b>,
      error: <b>Could not save.</b>,
    });

    // delay becase toast message showing
    setTimeout(() => {
      setButtonDissable(false);
      navigate("/");
    }, 1000);

    setdesc("");
    reset();
  };

  return (
    <div className="container flex flex-col md:flex-row p-4 gap-14 mb-16  mx-auto">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="container flex flex-col md:flex-row p-4 gap-14 mb-16 mx-auto"
      >
        <div className=" flex md:px-4 gap-4 flex-col w-full md:w-4/6 ">
          <input
            type="text"
            placeholder="Title..."
            className="border-[1px] outline-none border-gray-400 p-2"
            {...register("title")}
          />
          <p className="text-red-500">{errors.title?.message}</p>
          <div className="h-[250px] md:h-[400px] relative">
            <ReactQuill
              theme="snow"
              onChange={(value) => setdesc(value)}
              value={desc}
              className=" h-[180px] md:h-[350px]"
            />
          </div>
        </div>
        <div className=" flex md:px-4 flex-col w-full md:w-2/6 gap-4 md:gap-8">
          <div>
            <label
              htmlFor="img"
              className="text-xl font-semibold text-blue-400 cursor-pointer"
            >
              upload image
            </label>
            <input type="file" id="img" hidden onChange={handleImage} /> <br />
          </div>
          <select
            id=""
            className="outline-none border-[1px] border-gray-400 cursor-pointer p-2"
            {...register("cat")}
            defaultValue=""
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Technology">Technology</option>
            <option value="Health and Wellness">Health and Wellness</option>
            <option value="Travel and Lifestyle">Travel and Lifestyle</option>
            <option value="Sports">Sports</option>
            <option value="Food and Cooking">Food and Cooking</option>
            <option value="Business and Finance">Business and Finance</option>
            <option value="science">Science</option>
            <option value="Art and Culture">Arts and Culture</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <p className="text-red-500">{errors.cat?.message}</p>

          <button
            disabled={buttonDissable}
            className="self-start p-2 px-4 bg-sky-200 hover:bg-sky-500 rounded-sm hover:text-white disabled:bg-sky-100 disabled:text-black"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
