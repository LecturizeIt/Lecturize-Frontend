import { IUser } from "../context/AuthContext";

type NavigateFunction = (path: string) => void;
type LogoutFunction = () => void;

type Action = "logout" | "redirectToLecture" | "redirectToLogin";

interface IActionMap {
  [key: string]: (user: IUser | null, navigate: NavigateFunction, logout: LogoutFunction) => void;
}

const actionMap: IActionMap = {
  logout: (user, navigate, logout) => {
    if (user) {
      logout();
    }
    navigate("/login");
  },
  redirectToLecture: (user, navigate, ) => {
    navigate(user ? "/lecture" : "/login");
  },
  redirectToLogin: (_, navigate) => {
    navigate("/login");
  }
};

export const handleUserAction = (user: IUser | null, navigate: NavigateFunction, logout: LogoutFunction, action: Action) => {
  const actionFunction = actionMap[action];
  if (actionFunction) {
    actionFunction(user, navigate, logout);
  } 
};
