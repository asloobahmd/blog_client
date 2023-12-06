import { FC } from "react";
import { Link } from "react-router-dom";

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

const CatPost: FC<PostProps> = ({ post }) => {
  return (
    <Link to={`/${post._id}`}>
      <div className=" bg-slate-200 rounded-sm border-[1px] p-4 mx-auto flex flex-col md:mb-8 md:gap-4">
        <div className="w-full  flex justify-center items-center">
          <img className="w-[500px] h-[300px] object-cover" src={post.img} />
        </div>
        <div className="flex flex-col justify-between w-full gap-6 md:gap-6">
          <h1 className="text-xl font-bold text-center">{post.title}</h1>
        </div>
      </div>
    </Link>
  );
};

export default CatPost;
