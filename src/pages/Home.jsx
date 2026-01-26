import React from "react";
import Authentication from "../components/Authentication";
// import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <>
      <Authentication />
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </>
  );
};

export default Home;


// inside Home page
// import { Navigate } from "react-router-dom";
// import { useUser } from "../context/UserContext";

// const Home = () => {
//   const { user } = useUser();

//   if (user) return <Navigate to="/chat" replace />;

//   return <Authentication />;
// };

