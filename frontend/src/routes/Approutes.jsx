import React from "react";
import { lazy } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
const Signin = lazy(() => import("../components/Signin"));
const Login = lazy(() => import("../components/Login"));
const Home = lazy(() => import("../components/Home"));

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
