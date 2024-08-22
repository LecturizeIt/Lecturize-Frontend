import { useState } from "react";
import InputLogin from "../../ui/InputLogin/InputLogin.ui";
import Button from "../../ui/Button/Button.ui";
import { ErrorNotification } from "../../ui/ErrorNotification/ErrorNotification.ui";

function RegisterPage () {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: "name" | "email" | "password" | "confirmPassword"
  ) => {
    const value = e.target.value;
    switch (inputType) {
    case "name":
      setInputName(value);
      break;
    case "email":
      setInputEmail(value);
      break;
    case "password":
      setInputPassword(value);
      break;
    case "confirmPassword":
      setConfirmPassword(value);
      break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword !== confirmPassword) {
      setError("As senhas não são compatíveis.");
      return;
    }

    // adicionar logica para criar conta

    setError(null);
    console.log("Conta criada com sucesso!");
  };

  return (
    <div className="w-screen h-screen bg-[#e2e2e2] flex items-center justify-center">
      <div className="bg-gradient-to-b from-white/90 to-white/40 rounded-lg w-[90%] max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto py-8 px-4 md:px-8 shadow-2xl flex flex-col items-center">
        <h1 className="text-shadow text-2xl md:text-3xl lg:text-4xl font-bold text-black whitespace-nowrap text-center mb-6">
          Lecturize It
        </h1>

        {error && <ErrorNotification error={error} />}

        <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit}>
          <div>
            <h3 className="font-bold">Nome</h3>
            <InputLogin
              value={inputName}
              type="text"
              placeholder="nome"
              onChange={(e) => handleInputChange(e, "name")}
              width="100%"
            />
          </div>
          <div>
            <h3 className="font-bold">E-mail</h3>
            <InputLogin
              value={inputEmail}
              type="email"
              placeholder="e-mail"
              onChange={(e) => handleInputChange(e, "email")}
              width="100%"
            />
          </div>

          <div>
            <h3 className="font-bold">Senha</h3>
            <InputLogin
              value={inputPassword}
              type="password"
              placeholder="senha"
              onChange={(e) => handleInputChange(e, "password")}
              width="100%"
            />
          </div>

          <div>
            <h3 className="font-bold">Confirmar Senha</h3>
            <InputLogin
              value={confirmPassword}
              type="password"
              placeholder="confirmar senha"
              onChange={(e) => handleInputChange(e, "confirmPassword")}
              width="100%"
            />
          </div>

          <div className="flex justify-center">
            <Button type="submit" width="80%" height="50px" text="Criar Conta" />
          </div>
        </form>
        <div className="pt-4">
          <h3 className="font-semibold">
            Já possui uma conta? <span className="text-[#861efd] hover:underline"><a href="/Login">Faça Login</a></span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
