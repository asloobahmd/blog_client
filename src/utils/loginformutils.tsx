import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginformData } from "../types/types";

export const utillLoginForm = () => {
  const yupSchema = yup.object().shape({
    username: yup.string().min(6).required("Username is required"),
    password: yup.string().min(6).required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginformData>({
    resolver: yupResolver(yupSchema),
  });

  return { register, handleSubmit, errors };
};
