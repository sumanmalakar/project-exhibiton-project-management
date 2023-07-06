// import React, { useEffect, useState } from "react";

// import { Redirect, Route, Navigate } from "react-router";
// import Sidebar from "./Layout/Sidebar";
// import Header from "./Layout/Header";
// import Home from "../components/design/Home"
import Navbar from "../components/design/Navbar"

export default function PrivateRoute({ children }) {
//   const auth = JSON.parse(sessionStorage.getItem("auth"));
//   console.log(auth);

//   if (!auth) {
//     return <Navigate to="/login" />;
//   }

  return (
    <>
      <div>
        {/* <Header/> */}
        <Navbar />
        {/* <Sidebar>{children}</Sidebar> */}
      </div>
    </>
  );
}
