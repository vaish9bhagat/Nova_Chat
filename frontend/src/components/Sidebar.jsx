import React from "react";
import { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { selectChat } from "../store/Reducers";
import axios from "axios";
import { newChat, setChats } from "../store/Reducers";
import { useNavigate } from "react-router-dom";

const Sidebar = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let chats = useSelector((state) => state.chats.chats);

  const chatSelector = (id) => {
    const chatClicked = chats.filter((c) => c._id === id);
    dispatch(selectChat(chatClicked[0]._id));
  };

  const getAllChats = async () => {
    try {
      var response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getchats`,
        {
          withCredentials: true,
        },
      );
      dispatch(setChats(response.data.chats.reverse()));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //getAllChats();
  }, []);

  const chatDeleteHandler = async (chatId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/deletechat/${chatId}`,
        { withCredentials: true },
      );
      dispatch(setChats(res.data.chats.reverse()));
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
      );
      if (res.status == 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data =
    chats.length > 0 ? (
      chats?.map((chat) => {
        return (
          <div
            key={chat._id}
            onClick={() => chatSelector(chat._id)}
            className="bg-[#28263B] rounded p-2 flex items-center justify-between text-md"
          >
            <h1>{chat.title}</h1>
            <i
              onClick={() => chatDeleteHandler(chat._id)}
              class="ri-delete-bin-5-line"
            ></i>
          </div>
        );
      })
    ) : (
      <div>
        <h1> No chats found. Create one!</h1>
      </div>
    );

  return (
    <div
      ref={ref}
      className="absolute p-3 md:w-[30%] w-55  h-screen bg-[#020016] -left-55 md:-left-90  z-20 text-white flex flex-col gap-3 border-r border-[#BE86FF]"
    >
      <div className="w-full flex flex-col gap-2">
        <h1 className="font-bold text-2xl text-[#BE86FF] ">All chats </h1>
        {data}
      </div>
      <button
        onClick={() => logOut()}
        className="mt-10 bg-[#BE86FF] w-1/2 m-auto p-0.5 rounded text-xl "
      >
        Log out
      </button>
    </div>
  );
});

export default Sidebar;
