import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { regformData } from "../types/types";

export const utillRegForm = () => {
  const yupSchema = yup.object().shape({
    username: yup.string().min(6).required("Username is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup.string().min(6).required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<regformData>({
    resolver: yupResolver(yupSchema),
  });

  return { register, handleSubmit, errors };
};
