import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Market from "../pages/Market";
import Posts from "../pages/Posts";
import Create from "../pages/Create";
import Contact from "../pages/Contact";
import Login from "../pages/Login";

import Wallet from "../pages/Wallet";
import NftDetails from "../pages/NftDetails";
import PostDetails from "../pages/PostDetails";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/market" element={<Market />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/create" element={<Create />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/login" element={<Login />} />
      <Route path="/market/:id" element={<NftDetails />} />
      <Route path="/posts/:id" element={<PostDetails />} />
    </Routes>
  );
};

export default Routers;
