import Button from "../button";
import Input from "../input";

export function LoginForm() {
  return (
    <form className="flex w-full max-w-md grow flex-col items-center justify-center gap-5">
      <h2 className="w-full text-center text-3xl font-bold">Fazer Login</h2>

      <fieldset className="flex w-full flex-col gap-4">
        <Input placeholder="Email" type="email" />

        <Input placeholder="Senha" type="password" />

        <div className="flex w-full flex-col items-center justify-center gap-2.5">
          <Button type="button" className="font-bold">
            ENTRAR
          </Button>
          <p className="text-sm">
            Não possui conta? Registre-se{" "}
            <span className="text-indigo-600">aqui</span>
          </p>
        </div>
      </fieldset>
    </form>
  );
}
