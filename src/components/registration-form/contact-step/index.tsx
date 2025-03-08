import { z } from "zod";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { cpfRegex, validateCPF } from "@/app/utils/valide-cpf";
import { cnpjRegex, validateCNPJ } from "@/app/utils/validate-cnpj";

export const contactStepSchema = z.object({
  telefone: z.string().min(10, {
    message: "Certifique-se de inserir seu DDD + telefone.",
  }),
  cpf: z
    .string()
    .regex(cpfRegex, {
      message: "Certifique-se de inserir seu CPF sem pontos ou traços.",
    })
    .refine(validateCPF, {
      message: "CPF inválido.",
    }),
  cnpj: z
    .string()
    .regex(cnpjRegex, {
      message: "Certifique-se de inseror seu CNPJ sem pontos ou traços.",
    })
    .refine(validateCNPJ, {
      message: "CNPJ inválido.",
    }),
  companyName: z.string().min(2, {
    message: "Certifique-se de inserir o nome da empresa.",
  }),
});

export function ContactStep({
  setContactStepData,
  setStep,
  contactStepData,
}: {
  setContactStepData: Dispatch<
    SetStateAction<z.infer<typeof contactStepSchema> | undefined>
  >;
  setStep: Dispatch<SetStateAction<1 | 2 | 3 | 4>>;
  contactStepData: z.infer<typeof contactStepSchema> | undefined;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactStepSchema),
    defaultValues: {
      telefone: contactStepData?.telefone || "",
      cpf: contactStepData?.cpf || "",
      cnpj: contactStepData?.cnpj || "",
      companyName: contactStepData?.companyName || "",
    },
  });

  function handleNextStep(data: z.infer<typeof contactStepSchema>) {
    setContactStepData(data);
    setStep(3);
  }

  function previousStep() {
    reset();
    setStep(1);
  }

  return (
    <form
      onSubmit={handleSubmit(handleNextStep)}
      className="flex w-full flex-col"
    >
      <fieldset className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Input
            placeholder="DDD + Telefone"
            type="text"
            {...register("telefone")}
          />

          {errors.telefone && (
            <p className="text-red-400">{errors.telefone.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input placeholder="CPF" type="text" {...register("cpf")} />

          {errors.cpf && <p className="text-red-400">{errors.cpf.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Input placeholder="CNPJ" type="text" {...register("cnpj")} />

          {errors.cnpj && <p className="text-red-400">{errors.cnpj.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            placeholder="Nome da empresa"
            type="text"
            {...register("companyName")}
          />

          {errors.companyName && (
            <p className="text-red-400">{errors.companyName.message}</p>
          )}
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-2.5">
          <Button type="submit" className="font-bold">
            AVANÇAR
          </Button>
          <button
            type="button"
            onClick={previousStep}
            className="cursor-pointer text-sm text-slate-400 underline transition-colors duration-300 hover:text-slate-300"
          >
            Voltar
          </button>
        </div>
      </fieldset>
    </form>
  );
}
