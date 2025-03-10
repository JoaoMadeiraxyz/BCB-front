import { z } from "zod";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";

export const infoStepSchema = z
  .object({
    name: z.string().min(2, {
      message: "Certifique-se de inserir o seu nome.",
    }),
    email: z.string().email({
      message: "Certifique-se de inserir um email válido.",
    }),
    password: z.string().min(6, {
      message: "A senha deve conter no mínimo 6 caracteres.",
    }),
    confirmPassword: z.string().min(6, {
      message: "A senha deve conter no mínimo 6 caracteres.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "As senhas não coincidem.",
        code: "custom",
      });
    }
  });

export function InfoStep({
  setInfoStepData,
  setStep,
  infoStepData,
}: {
  setInfoStepData: Dispatch<
    SetStateAction<z.infer<typeof infoStepSchema> | undefined>
  >;
  setStep: Dispatch<SetStateAction<1 | 2 | 3 | 4>>;
  infoStepData: z.infer<typeof infoStepSchema> | undefined;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(infoStepSchema),
    defaultValues: {
      name: infoStepData?.name || "",
      email: infoStepData?.email || "",
      password: infoStepData?.password || "",
      confirmPassword: infoStepData?.confirmPassword || "",
    },
  });

  function handleNextStep(data: z.infer<typeof infoStepSchema>) {
    setInfoStepData(data);
    setStep(2);
  }

  return (
    <form
      onSubmit={handleSubmit(handleNextStep)}
      className="flex w-full flex-col"
    >
      <fieldset className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Input placeholder="Nome" type="text" {...register("name")} />

          {errors.name && <p className="text-red-400">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Input placeholder="Email" type="email" {...register("email")} />

          {errors.email && (
            <p className="text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            placeholder="Senha"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-400">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            placeholder="Confirmar senha"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-2.5">
          <Button type="submit" className="font-bold">
            AVANÇAR
          </Button>
          <p className="text-sm">
            Já é um usuário? Entre em sua conta{" "}
            <span className="text-indigo-600">aqui</span>
          </p>
        </div>
      </fieldset>
    </form>
  );
}
