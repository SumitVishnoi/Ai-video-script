import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { AuthDataContext } from "../context/AuthContext";

const Nav = () => {
  const navigate = useNavigate();
  const { GetUser } = useContext(UserDataContext);
  const {serverUrl} = useContext(AuthDataContext)

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/auth/logout`,
        { withCredentials: true }
      );
      console.log(response.data);
      GetUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex justify-between px-8 py-4">
        <h1 className="text-2xl font-bold text-[white]">GenVideo</h1>
        <button
          className="bg-[#27E0B3] active:bg-[#014433] px-5 py-2 rounded font-medium cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;
