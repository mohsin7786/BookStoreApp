import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Login from "./Login";
import axios from 'axios';
import toast from "react-hot-toast";

function Signup() {

  const loaction =useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("Signup Data:", data);
    // alert("Signup Successful (Frontend only)");
    // document.getElementById("signup_modal").close();

    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password
    }

    await axios.post('http://localhost:3000/user/signup', userInfo)
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          toast.success("Signup successfully")
           navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.message)

      })
  };

  return (
    <>
      {/* SIGNUP MODAL */}
      <dialog id="signup_modal" className="modal modal-open">
        <div className="modal-box relative">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Close button */}
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() =>
                document.getElementById("signup_modal").close()
              }
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Signup</h3>

            {/* Name */}
            <div className="mt-4 space-y-2">
              <span>Name</span>
              <br />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("name", { required: true })}
              />
              <br />
              {errors.name && (
                <span className="text-sm text-red-500">
                  Name is required
                </span>
              )}
            </div>

            {/* Email */}
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-sm text-red-500">
                  email is required
                </span>
              )}
            </div>

            {/* Password */}
            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && (
                <span className="text-sm text-red-500">
                  password is required
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-around mt-4">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
                Signup
              </button>

              <p className="text-xl">
                Have account?{" "}
                <button
                  type="button"
                  className="underline text-blue-500"
                  onClick={() => {
                    document.getElementById("signup_modal").close();
                    document.getElementById("my_modal_3").showModal();
                  }}
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </dialog>

      {/* LOGIN MODAL */}
      <Login />
    </>
  );
}

export default Signup;
