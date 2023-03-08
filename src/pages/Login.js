import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Login = ({ isLogin, setIsLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, reseatPassword } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [passREsetError, setPassResetError] = useState("");

  //Handler Login Form with react-hook-form

  const handleLogin = (data) => {
    // console.log(data);
    setLoginError("");
    const { email, password } = data;
    signIn(email, password)
      .then((result) => {
        toast.success("User Successfully Login!");
        // console.log(result);
      })
      .catch((error) => {
        console.log(error.massage);
        setLoginError(error.message);
      });
  };

  const resetPassword = () => {
    toast((t) => (
      <div>
        <div className="flex justify-end">
          <button
            className="bg-orange-200 hover:bg-orange-200 w-8 h-8 rounded-full "
            onClick={() => toast.dismiss(t.id)}
          >
            X
          </button>
        </div>
        <form onSubmit={handlerPasswordReset}>
          <p className="text-center font-semibold text-2xl">
            Password Recovery
          </p>
          <input
            placeholder="Enter email"
            type="email"
            name="email"
            className="rounded border-2 p-2 w-full my-3 "
          />

          <button className="bg-blue-700  hover:bg-blue-800 text-white py-2 px-3 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    ));
  };

  const handlerPasswordReset = (e) => {
    e.preventDefault();
    const userEmail = e.target.email.value;
    if (!userEmail) {
      toast.error("Please enter your email address.0");
      return;
    }
    setPassResetError("");
    reseatPassword(userEmail)
      .then(() => {
        toast.success("Password reset email sent,please Check your email.");
      })
      .catch((error) => {
        console.error(error);
        setPassResetError(error.message);
      });
  };

  return (
    <>
      <div className="w-96 mx-auto p-8 rounded-lg flex justify-center items-center bg-white shadow-xl ">
        <div className="w-72">
          <div className=" flex justify-between mb-6">
            <Link
              onClick={() => {
                setIsLogin(true);
              }}
            >
              <h3
                className={`text-3xl text-center ${
                  isLogin && "border-blue-700 border-b-2"
                }`}
              >
                Login
              </h3>
            </Link>
            <Link onClick={() => setIsLogin(false)}>
              <h3 className="text-3xl text-center">Sign Up</h3>
            </Link>
          </div>
          <form className="" onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full ">
              <input
                {...register("email", {
                  required: "Email Address is required",
                })}
                placeholder="Enter Email"
                type="email"
                className="rounded border-2 p-2 w-full mt-2 "
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
                    message: "password must be at least 6 charecters or longer",
                  },
                })}
                placeholder="Password"
                type="password"
                className="rounded border-2 p-2 w-full my-2 "
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="link-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Rember me.
              </label>
            </div>

            <input
              className="btn mb-3 mt-5 text-white  bg-blue-700  hover:bg-blue-800 rounded-lg w-full py-2"
              value="Login"
              type="submit"
            />

            <div className=" text-start">
              <p>
                <small>
                  Forgot your password?
                  <button
                    type="button"
                    className="btn ml-2 text-blue-700 font-semibold hover:underline"
                    onClick={resetPassword}
                  >
                    Reset Password
                  </button>
                </small>
              </p>
            </div>
          </form>
          <div>
            {loginError && (
              <p className="text-red-600">
                Please enter your valid email and password
              </p>
            )}
          </div>
          <div>
            {passREsetError && (
              <p className="text-red-600">
                Please enter your valid email.User not found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
