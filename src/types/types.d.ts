export type regformData = {
  username: string;
  email: string;
  password: string;
};

export type loginformData = {
  username: string;
  password: string;
};

export type addPostData = {
  title: string;
  cat: string;
};

export type writePostProps = {
  title: string;
  desc: string | null;
  img: string;
  cat: string;
};

export type PostType = {
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

export type ApiResponse = PostType[];
