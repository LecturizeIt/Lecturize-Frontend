import { useState } from "react";
import Input from "../../ui/Input/Input.ui";
import Button from "../../ui/Button/Button.ui";
import { ErrorNotification } from "../../ui/ErrorNotification/ErrorNotification.ui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { EyeIcon } from "@heroicons/react/16/solid";

function LoginPage () {
  const { login } = useAuth();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isShowPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: "email" | "password"
  ) => {
    if (inputType === "email") {
      setInputEmail(e.target.value);
    } else {
      setInputPassword(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(inputEmail, inputPassword);
      navigate("/");
    } catch (err) {
      console.log("error:", err);
      setError("E-mail ou senha incorretos.");
    }
  };
  return (
    <div className="w-screen h-screen bg-[#e2e2e2] flex items-center justify-center">
      <div className="bg-gradient-to-b from-white/90 to-white/40 rounded-lg w-[90%] max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto py-8 px-4 md:px-8 shadow-2xl flex flex-col items-center">
        <h1 className="text-shadow text-2xl md:text-3xl lg:text-4xl font-bold text-black whitespace-nowrap text-center mb-6">
          Lecturize It
        </h1>

        {error && <ErrorNotification error={error} />}

        <form
          className="flex flex-col w-full space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <h3 className="font-bold">E-mail</h3>
            <Input
              value={inputEmail}
              type="text"
              placeholder="e-mail"
              onChange={(e) => handleInputChange(e, "email")}
              width="100%"
            />
          </div>

          <div>
            <h3 className="font-bold">Senha</h3>
            <div className="relative flex items-center gap-2">
              <Input
                value={inputPassword}
                type={isShowPassword ? "text" : "password"}
                placeholder="senha"
                onChange={(e) => handleInputChange(e, "password")}
                width="100%"
              />
              <Button
                onClick={togglePasswordVisibility}
                icon={<EyeIcon type="eyes" className="h-4 w-4" />}
                width="10%"
                height="10%"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox cursor-pointer text-blue-600"
              />
              <span className="cursor-pointer">Lembrar Senha</span>
            </label>
            <a href="#" className="text-[#861efd] hover:underline">
              Esqueceu sua senha?
            </a>
          </div>

          <div className="flex justify-center">
            <Button type="submit" width="80%" height="50px" text="Entrar" />
          </div>
        </form>
        <div className="pt-4">
          <h3 className="font-semibold">
            Não possui uma conta?{" "}
            <span className="text-[#861efd] hover:underline">
              <a href="/register">Inscreva-se gratuitamente!</a>
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
