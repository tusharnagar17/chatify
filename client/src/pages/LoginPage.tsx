import React from "react";
import FormContainer from "../components/FormContainer";
import AppIcon from "../components/AppIcon";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginRoute } from "../utils/ApiRoute";
import axios from "axios";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
const inputClass = `outline-none w-full hover:ring ring-sky-300 rounded-md border-2 border-gray-300 px-2 py-1 my-2`;

const LoginPage = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleInputError = () => {
    const { email, password } = formValue;

    if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    const { email, password } = formValue;
    event.preventDefault();
    if (handleInputError()) {
      const { data } = await axios.post(LoginRoute, {
        email,
        password,
      });
      if (data?.status == false) {
        toast.error(data?.message, toastOptions);
      }
      if (data?.status == true) {
        toast.info(data?.message, toastOptions);
        navigate("/");
      }
      console.log("login data", data);
    }
  };

  return (
    <>
      <FormContainer>
        <form
          className="flex-row md:max-w-sm rounded-3xl m-2 p-4 md:p-10 bg-front"
          onSubmit={handleSubmit}
        >
          {/* App icons */}
          <AppIcon />

          {/* Login form */}
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className={inputClass}
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className={inputClass}
          />

          <button
            type="submit"
            className={`outline-none w-full hover:ring  rounded-md   px-2 py-1 my-2 border-violet-400 ring-violet-400 bg-violet-400 hover:bg-violet-600 font-bold`}
          >
            Login
          </button>
          <br />
          <div className="text-white text-center font-semibold my-2">
            Don't have an account ?{" "}
            <Link to={"/register"} className="text-violet-400 font-bold">
              Register
            </Link>
          </div>
        </form>
      </FormContainer>

      <ToastContainer />
    </>
  );
};

export default LoginPage;
