import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup.string().min(6).required("Username is required"),
  password: yup.string().min(6).required("Password is required"),
});

const registerSchema = yup.object().shape({
  username: yup.string().min(6).required("Username is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
});

const createPostSchema = yup.object().shape({
  title: yup.string().min(3).required("Enter post title"),
  cat: yup.string().required("Catagory is required"),
});

export { loginSchema, registerSchema, createPostSchema };
