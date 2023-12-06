import { FC } from "react";
import Posts from "./Posts";

type MenuProps = {
  cat: string;
  postId: string;
};

const Menu: FC<MenuProps> = ({ cat, postId }) => {
  return (
    <div className="hidden  px-6 lg:block lg:w-2/6">
      <h1>Related Posts</h1>
      <Posts relcat={cat} postId={postId} />
    </div>
  );
};

export default Menu;
