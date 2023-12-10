import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../context/authContext";
import { loginformData } from "../types/types";
import useFormHook from "../utils/useFormHook";
import { loginSchema } from "../utils/validationSchema";

const inputStyle =
  "border-[1px] border-stone-400 outline-none p-4 w-full rounded-sm md:p-[12px]";

const Login = () => {
  const [error, setError] = useState<string | null>(null);

  const { login } = useContext<AuthContextProps>(AuthContext);

  const navigate = useNavigate();

  const { register, handleSubmit, errors } =
    useFormHook<loginformData>(loginSchema);

  const onsubmit = async (data: loginformData) => {
    try {
      await login(data);
      navigate("/");
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <section className=" mx-auto w-full h-[calc(100dvh)]">
      <div className="w-[360px] flex flex-col gap-6 md:w-[380px] h-fit p-4 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-stone-100">
        <div className=" text-6xl font-bold mb-4 text-center">Blog</div>
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="w-full flex flex-col gap-6"
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
              placeholder="password.."
              type="password"
              className={inputStyle}
              {...register("password")}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <button className="py-[12px] bg-sky-200 hover:bg-sky-500 rounded-sm hover:text-white text-xl">
            LOGIN
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>

        <div className="text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
