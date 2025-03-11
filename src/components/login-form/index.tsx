"use client";

import { useAuthStore } from "@/stores/auth-store";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { signin, error, loading, accessToken, fetchUser } = useAuthStore();
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setFormError(null);
    await signin(data);
  };

  useEffect(() => {
    if (error) {
      if (error === "Invalid credentials") {
        setFormError("Credenciais inválidas");
        return;
      }

      if (error === "No access token found") {
        setFormError("Você não está autenticado.");
        return;
      }

      setFormError(error);
    }
  }, [error]);

  useEffect(() => {
    if (accessToken) {
      fetchUser();
      router.push("/mensagens");
    }
  }, [accessToken, router]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md grow flex-col items-center justify-center gap-5"
    >
      <h2 className="w-full text-center text-3xl font-bold">Fazer Login</h2>

      <fieldset className="flex w-full flex-col gap-4">
        <Input
          placeholder="Email"
          type="email"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}

        <Input
          placeholder="Senha"
          type="password"
          {...register("password")}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        {formError && <p className="text-sm text-red-500">{formError}</p>}

        <div className="flex w-full flex-col items-center justify-center gap-2.5">
          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-indigo-600 font-bold hover:bg-indigo-500"
          >
            {loading ? "Carregando..." : "ENTRAR"}
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
