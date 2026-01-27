import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Signin from "../components/Signin";
import Login from "../components/Login";
import Home from "../components/Home";


const Approutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default Approutes;
