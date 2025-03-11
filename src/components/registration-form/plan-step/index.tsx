import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const planStepSchema = z.object({
  plan: z.enum(["pre-pago", "pos-pago"]),
});

export function PlanStep({
  setPlanStepData,
  setStep,
  planStepData,
}: {
  setPlanStepData: Dispatch<
    SetStateAction<z.infer<typeof planStepSchema> | undefined>
  >;
  setStep: Dispatch<SetStateAction<1 | 2 | 3 | 4>>;
  planStepData: z.infer<typeof planStepSchema> | undefined;
}) {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(planStepSchema),
    defaultValues: {
      plan: planStepData?.plan || "pre-pago",
    },
  });

  function handleNextStep(data: z.infer<typeof planStepSchema>) {
    setPlanStepData(data);
    setStep(4);
  }

  function previousStep() {
    reset();
    setStep(2);
  }

  return (
    <form
      onSubmit={handleSubmit(handleNextStep)}
      className="flex w-full flex-col"
    >
      <fieldset className="flex w-full flex-col items-center gap-4">
        <p className="text-center text-slate-400">
          Selecione o plano de pagamento.
        </p>

        <RadioGroup
          onValueChange={(value: "pre-pago" | "pos-pago") =>
            setValue("plan", value)
          }
          defaultValue="pre-pago"
        >
          <div className="flex w-full flex-row justify-between gap-3.5">
            <div className="flex min-h-64 w-1/2 flex-col gap-2 rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem id="pre-pago" value="pre-pago" />
                <label htmlFor="pre-pago">Pré Pago</label>
              </div>

              <p className="text-sm">
                Adicione créditos à sua conta e envie mensagens livremente por
                um valor de R$ 0,25 em créditos cada.
              </p>
            </div>

            <div className="flex min-h-64 w-1/2 flex-col gap-2 rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem id="pos-pago" value="pos-pago" />
                <label htmlFor="pos-pago">Pós pago</label>
              </div>

              <p className="text-sm">
                Envie mensagens livremente com um limite de créditos inicial de
                R$ 100,00.
              </p>
            </div>
          </div>
        </RadioGroup>

        {errors.plan && <p className="text-red-400">{errors.plan.message}</p>}

        <div className="flex w-full flex-col items-center justify-center gap-2.5">
          <Button
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 font-bold hover:bg-indigo-500"
          >
            CADASTRAR
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
