import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { AuthDataContext } from "./AuthContext";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const {serverUrl} = useContext(AuthDataContext)

  const GetUser = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/auth/getuser`,
        { withCredentials: true }
      );
      setUserData(response.data);
    } catch (error) {
      setUserData(null);
      // console.log(error);
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  const value = {
    userData,
    setUserData,
    GetUser,
  };
  return (
    <div>
      <UserDataContext.Provider value={value}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
