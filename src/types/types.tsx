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
