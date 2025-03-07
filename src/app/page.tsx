import Button from "./components/button";
import Input from "./components/input";

export default function Home() {
  return (
    <section className="flex h-screen flex-row">
      <div className="flex w-1/2 flex-col items-center justify-center">
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
      </div>

      <div className="flex h-full w-1/2 flex-col items-center justify-center bg-indigo-600 p-11 text-white">
        <h1 className="text-7xl leading-20">
          O mais novo e interessante enviador de SMS e outras mensagens
          brasileiro.
        </h1>
      </div>
    </section>
  );
}
