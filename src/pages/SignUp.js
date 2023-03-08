import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

import { Link } from "react-router-dom";

const SignUp = ({ isLogin, setIsLogin }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUser } = useContext(AuthContext);
  const [signupError, setSignupError] = useState("");

  //Handler sign up Form with react-hook-form

  const handlerSignUp = (data) => {
    // console.log(data);
    setSignupError("");
    const { email, password, name } = data;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        toast("Successfully create user", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        const userInfo = {
          displayName: name,
        };
        updateUser(userInfo)
          .then(() => {})
          .catch((error) => console.log(error));
        // console.log(user);
        reset();
      })
      .catch((error) => {
        setSignupError(error.message);
        console.log(error);
      });
  };

  return (
    <div className="w-96 mx-auto p-8 rounded-lg flex justify-center items-center bg-white shadow-xl ">
      <div className=" w-72 ">
        <div className=" flex justify-between mb-6">
          <Link
            onClick={() => {
              setIsLogin(true);
            }}
          >
            <h3 className="text-3xl text-center">Login</h3>
          </Link>
          <Link onClick={() => setIsLogin(false)}>
            <h3
              className={`text-3xl text-center ${
                !isLogin && "border-b-2 border-blue-700"
              }`}
            >
              Sign Up
            </h3>
          </Link>
        </div>
        <form onSubmit={handleSubmit(handlerSignUp)}>
          <div className="form-control w-full ">
            <input
              placeholder="Your Name"
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              className="rounded border-2 p-2 w-full mt-2"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <input
              placeholder="Your  email"
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="rounded border-2 p-2 w-full mt-2"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <input
              placeholder="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "must be atleast 6 disits" },

                pattern: {
                  value: /[A-Z]/,
                  message: "Password must be a capital letter",
                },
              })}
              className="rounded border-2 p-2 w-full mt-2"
            />
            {errors.password && (
              <p className="text-red-600 ">{errors.password.message}</p>
            )}
          </div>
          <input
            className="btn mb-3 mt-5 text-white  bg-blue-700  hover:bg-blue-800 rounded-lg w-full py-2"
            value="Sign Up"
            type="submit"
          />
        </form>
        {signupError && <p className="text-red-600">Email Already in Use</p>}
      </div>
    </div>
  );
};

export default SignUp;
