import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar.component";

function App () {
  const { user } = useAuth();

  return (
    <div className="w-screen h-screen bg-[#e2e2e2]">
      <Navbar />
      {user && (
        <h3>Bem-vindo - {user.username}</h3>
      )}
    </div>
  );
}

export default App;
