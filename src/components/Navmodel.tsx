import { FC, useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../context/authContext";

interface NavmodelProps {
  setmodel: (showmodel: boolean) => void;
}

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
    <div className="md:hidden absolute z-50 bg-zinc-900/40 inset-0 flex items-start justify-center">
      <div className="py-8 px-6 bg-white mt-[100px] w-[340px] rounded-md shadow-lg relative">
        <button
          onClick={handleClick}
          className="absolute top-2 right-5 text-2xl"
        >
          X
        </button>
        <div className="mt-[20px]">
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
    </div>
  );
};

export default Navmodel;
