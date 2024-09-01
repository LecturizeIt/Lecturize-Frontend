export const handleAuthAction = (user: unknown, navigate: unknown, logout: unknown) => {
  if (user) {
	  logout();
	  navigate("/login");
  } else {
	  navigate("/login");
  }
};