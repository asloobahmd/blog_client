import { Link, useNavigate } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { utillRegForm } from "../utils/regformutils";
import { regformData } from "../types/types";

const inputStyle =
  "border-[1px] border-stone-400 outline-none p-4 w-full rounded-sm md:p-[12px]";

const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, errors } = utillRegForm();

  const registerMutation = useMutation({
    mutationFn: async (data: regformData) => {
      return axios.post(
        "https://blogts-node-api.onrender.com/auth/register",
        data,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {},
  });

  const onsubmit = async (data: regformData) => {
    try {
      await registerMutation.mutateAsync(data);
      setError(null);
      navigate("/login");
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <section className=" mx-auto w-full h-[calc(100dvh)]">
      <div className="w-[360px] flex flex-col gap-6  md:w-[380px] h-fit p-4 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-stone-100">
        <div className=" text-6xl font-bold mb-4 text-center">Blog</div>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="w-full flex flex-col gap-6 "
        >
          <div>
            <input
              placeholder="username.."
              type="text"
              className={inputStyle}
              {...register("username")}
            />
            <p className="text-red-500">{errors.username?.message}</p>
          </div>
          <div>
            <input
              placeholder="email.."
              type="email"
              className={inputStyle}
              {...register("email")}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div>
            <input
              placeholder="password.."
              type="password"
              className={inputStyle}
              {...register("password")}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <button className="py-[12px]  bg-sky-200 hover:bg-sky-500 rounded-sm hover:text-white text-xl">
            REGISTER
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>

        <div className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
