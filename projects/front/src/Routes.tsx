import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";


export function AppRoutes() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teste" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        </Routes>
      </Router>
    </>
  );
}