import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addPostData } from "../types/types";

export const addPostForm = () => {
  const yupSchema = yup.object().shape({
    title: yup.string().min(3).required("Enter post title"),
    cat: yup.string().required("Catagory is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addPostData>({
    resolver: yupResolver(yupSchema) as any,
  });

  return { register, handleSubmit, errors, reset };
};
