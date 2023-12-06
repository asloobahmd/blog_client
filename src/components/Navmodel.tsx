import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext, AuthContextProps } from "../context/authContext";

type NavmodelProps = {
  setmodel: (showmodel: boolean) => void;
};

const Navmodel: FC<NavmodelProps> = ({ setmodel }) => {
  const { logout, currentUser } = useContext<AuthContextProps>(AuthContext);

  const navigate = useNavigate();

  const handleClick = () => {
    setmodel(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="p-6 bg-slate-100 absolute z-50 top-[70px] left-1/2 -translate-x-1/2 w-[340px] md:hidden">
      <button onClick={handleClick} className="float-right text-xl mb-2">
        x
      </button>
      <div>
        <ul className="flex flex-col gap-4 items-center">
          <Link to="/" onClick={handleClick}>
            <li>Home</li>
          </Link>
          <Link to={currentUser ? "/write" : "/"} onClick={handleClick}>
            <button
              onClick={() => {
                if (!currentUser) {
                  toast((t) => (
                    <span className="flex gap-3 justify-between items-center">
                      <p>Login First!</p>
                      <button
                        onClick={() => navigate("/login")}
                        className="py-1 px-2 bg-red-400 text-white rounded-sm"
                      >
                        Login
                      </button>
                    </span>
                  ));
                }
              }}
            >
              Create
            </button>
          </Link>
          {currentUser && (
            <button
              onClick={handleLogout}
              className="py-1 px-2 bg-red-400 text-white rounded-sm"
            >
              Logout
            </button>
          )}
          {currentUser ? (
            <li className="font-medium">{currentUser?.username}</li>
          ) : (
            <button
              onClick={handleLogin}
              className="py-1 px-2 bg-red-400 text-white rounded-sm"
            >
              Login
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navmodel;
