import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Signin from "../components/Signin";
import Login from "../components/Login";
import Home from "../components/Home";
import ProtectedRoute from "../components/PrivateRoutes";

const Approutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            {" "}
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Approutes;
