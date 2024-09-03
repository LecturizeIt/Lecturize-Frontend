
import { createBrowserRouter } from "react-router-dom";
import App from "./pages";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { NotFound } from "./pages/NotFound";
import Lecture from "./pages/Lecture";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/lecture",
    element: <Lecture />
  }

]);
