import { RegistrationForm } from "@/components/registration-form";

export default function Register() {
  return (
    <section className="flex h-screen flex-row">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <RegistrationForm />
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
