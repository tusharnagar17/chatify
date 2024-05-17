import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import AppIcon from "../components/AppIcon";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterRoute } from "../utils/ApiRoute";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const inputClass = `outline-none w-full hover:ring ring-sky-300 rounded-md border-2 border-gray-300 px-2 py-1 my-2`;

interface RegisterProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const [formValue, setFormValue] = useState<RegisterProps>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const { username, email, password, confirmPassword } = formValue;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
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
    const { username, email, password } = formValue;
    event.preventDefault();
    if (handleInputError()) {
      const { data } = await axios.post(RegisterRoute, {
        username,
        email,
        password,
      });
      if (data?.status === true) {
        await localStorage.setItem("chat-app-user", data?.user);
        toast.info(data?.message, toastOptions);
        navigate("/login");
      }
      if (data?.status === false) {
        toast.error(data?.message, toastOptions);
      }
    }
  };
  return (
    <>
      <FormContainer>
        <form
          className="flex-row md:max-w-sm rounded-3xl m-2 p-4 md:p-10 bg-front"
          onSubmit={handleSubmit}
        >
          <AppIcon />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className={inputClass}
          />
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
          <input
            type="text"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className={inputClass}
          />
          <button
            type="submit"
            className={`outline-none w-full hover:ring  rounded-md   px-2 py-1 my-2 border-violet-400 ring-violet-400 bg-violet-400 hover:bg-violet-600 font-bold`}
          >
            Register
          </button>
          <div className="text-white text-center font-semibold my-2">
            Already have an account ?{" "}
            <Link to={"/login"} className="text-violet-400 font-bold">
              Login
            </Link>
          </div>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default RegisterPage;
