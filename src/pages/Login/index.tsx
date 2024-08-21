import { useState } from "react";
import InputLogin from "../../ui/InputLogin/InputLogin.ui";
import Button from "../../ui/Button/Button.ui";
import { Icon } from "../../ui/Icon/Icon.ui";
import { ErrorNotification } from "../../ui/ErrorNotification/ErrorNotification.ui";

function LoginPage () {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // array ficticio de users
  const users = [
    {
      email: "user@example.com",
      password: "password123",
    },
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // verificacao simples para ver se email e a senha batem com user no array apenas para testar errornotification 
    const user = users.find(
      (user) =>
        user.email === inputEmail && user.password === inputPassword
    );

    if (!user) {
      setError("E-mail ou senha incorretos.");
    } else {
      setError(null);
      // logica para quando o login for sucesso
      console.log("Login bem-sucedido!");
    }
  };

  return (
    <div className="w-screen h-screen bg-[#8B80F9] flex items-center justify-center">
      <div className="bg-white rounded-lg w-[90%] max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto py-8 px-4 md:px-8 shadow-2xl flex flex-col items-center">
        <h1 className="text-shadow text-2xl md:text-3xl lg:text-4xl font-bold text-black whitespace-nowrap text-center mb-6">
          Lecturize It
        </h1>

        {error && <ErrorNotification error={error} />} 

        <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit}>
          <div>
            <h3 className="font-bold">E-mail</h3>
            <InputLogin
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
              <InputLogin
                value={inputPassword}
                type={showPassword ? "text" : "password"}
                placeholder="senha"
                onChange={(e) => handleInputChange(e, "password")}
                width="100%"
              />
              <Button
                onClick={togglePasswordVisibility}
                icon={<Icon type="eyes" className="h-4 w-4" />}
                width="10%"
                height="10%"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox cursor-pointer text-blue-600" />
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
            Não possui uma conta? <span className="text-[#861efd] hover:underline"><a href="/Register">Inscreva-se de graça!</a></span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
