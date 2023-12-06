import axios from "axios";
import { FC, useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../context/authContext";
import Navmodel from "./Navmodel";
import toast, { Toaster } from "react-hot-toast";

type NavbarProps = {};

const Navbar: FC<NavbarProps> = ({}) => {
  const [showModel, setShowModel] = useState<boolean>(false);

  const navigate = useNavigate();

  const { logout, currentUser } = useContext<AuthContextProps>(AuthContext);

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

  const handleClick = () => {
    setShowModel(true);
  };

  return (
    <nav className="container bg-white  flex items-center justify-between mx-auto p-6 border-b-2">
      <Link to="/">
        <h1 className="text-3xl">Logo</h1>
      </Link>
      <div>
        <ul className="hidden items-center gap-8 md:flex">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to={currentUser ? "/write" : "/"}>
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
              className="py-1 px-2 bg-red-500 hover:bg-red-400 text-white rounded-sm"
            >
              Logout
            </button>
          )}
          {currentUser ? (
            <li className="font-medium">{currentUser?.username}</li>
          ) : (
            <button
              onClick={handleLogin}
              className="py-1 px-2 bg-red-500 hover:bg-red-400 text-white rounded-sm"
            >
              Login
            </button>
          )}
        </ul>
      </div>
      <button className="text-[20px] md:hidden" onClick={handleClick}>
        | | |
      </button>
      {showModel && <Navmodel setmodel={setShowModel} />}
    </nav>
  );
};

export default Navbar;
