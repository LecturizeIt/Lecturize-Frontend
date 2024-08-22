
import { createBrowserRouter } from "react-router-dom";
import App from "./pages";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />
  },
  {
    path: "/Login",
    element: <LoginPage />
  },
  {
    path: "/Register",
    element: <RegisterPage />
  }

]);
