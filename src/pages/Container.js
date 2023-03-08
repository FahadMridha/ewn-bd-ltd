import React, { useState } from "react";
import image from "../assets/image/image.png";
import Login from "./Login";
import SignUp from "./SignUp";
const Container = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center bg-white-16 lg:pl-16 min-h-screen">
        <div className="hidden lg:block md:block">
          <img className="max-w-lg w-fit mx-auto" src={image} alt="loginPic" />
        </div>
        {isLogin ? (
          <Login isLogin={isLogin} setIsLogin={setIsLogin} />
        ) : (
          <SignUp isLogin={isLogin} setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
};

export default Container;
