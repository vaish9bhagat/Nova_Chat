import React from "react";
import Signin from "./components/Signin";
import Approutes from "./routes/Approutes";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { setChats } from "./store/Reducers";

const App = () => {
  const dispatch = useDispatch();
  const getAllChats = async () => {
    try {
      var response = await axios.get("http://localhost:3000/getchats", {
        withCredentials: true,
      });
      dispatch(setChats(response.data.chats.reverse()));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllChats();
  }, []);

  return (
    <>
      <Approutes />
    </>
  );
};

export default App;
