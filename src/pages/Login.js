import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import image from "../assets/image/image.jpg";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn } = useContext(AuthContext);

  const [loginError, setLoginError] = useState("");
  const handleLogin = (data) => {
    console.log(data);
    setLoginError("");
    const { email, password } = data;
    signIn(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error.massage);
        setLoginError(error.message);
      });
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center bg-lime-100 py-16 lg:pl-16">
        <div className="hidden lg:block">
          <img className="w-full" src={image} alt="loginPic" />
        </div>
        <div className="w-96 mx-auto p-8 rounded-lg flex justify-center items-center bg-white ">
          <div className="w-72">
            <div className=" flex justify-between mb-6">
              <Link to="/login">
                <h3 className="text-3xl text-center">Login</h3>
              </Link>
              <Link to="/signup">
                <h3 className="text-3xl text-center">Sign Up</h3>
              </Link>
            </div>
            <form className="" onSubmit={handleSubmit(handleLogin)}>
              <div className="form-control w-full ">
                <input
                  {...register("email", {
                    required: "Email Address is required",
                  })}
                  placeholder="Enter email"
                  type="email"
                  className="rounded border-y-2 p-2 w-full mt-2 "
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="form-control w-full">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "password must be at least 6 charecters or longer",
                    },
                  })}
                  placeholder="password"
                  type="password"
                  className="rounded border-y-2 p-2 w-full my-2 "
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <div class="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="link-checkbox"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Rember me.
                </label>
              </div>

              <input
                className="btn mb-3 mt-5 text-white  bg-blue-700  hover:bg-blue-800 rounded-lg w-full py-2"
                value="Login"
                type="submit"
              />

              <div className=" text-lg hover:underline">
                <Link to="/">Forgot your password?</Link>
              </div>
            </form>
            <div>
              {loginError && <p className="text-red-600">{loginError}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
