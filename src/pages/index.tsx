import { useAuth } from "../context/AuthContext";
import Button from "../ui/Button/Button.ui";

function App () {
  const { user, logout } = useAuth();

  return (
    <>
      <div>
        <h1>Lecturize It - App</h1>
        <h3>bem vindo - {user?.username}</h3>
        <Button onClick={logout} text="Sair"/>
      </div>
    </>
  );
}

export default App;