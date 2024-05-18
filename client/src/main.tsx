import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import SetAvatarPage from "./pages/SetAvatarPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <ChatPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/setAvatar", element: <SetAvatarPage /> },
  { path: "/login", element: <LoginPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
