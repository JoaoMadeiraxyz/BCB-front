"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InfoStep } from "./info-step";
import { z } from "zod";
import { useAuthStore } from "@/stores/auth-store";

import { infoStepSchema } from "./info-step";
import { ContactStep, contactStepSchema } from "./contact-step";
import { PlanStep, planStepSchema } from "./plan-step";
import { UserData } from "@/types/user";

export function RegistrationForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [infoStepData, setInfoStepData] =
    useState<z.infer<typeof infoStepSchema>>();
  const [contactStepData, setContactStepData] =
    useState<z.infer<typeof contactStepSchema>>();
  const [planStepData, setPlanStepData] =
    useState<z.infer<typeof planStepSchema>>();
  const [error, setError] = useState<string | null>(null);

  const { signup, signin, fetchUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (step === 4) {
      if (infoStepData && contactStepData && planStepData) {
        const { confirmPassword, ...infoData } = infoStepData;
        const combinedData: UserData = {
          ...infoData,
          ...contactStepData,
          ...planStepData,
        };

        const signupUser = async () => {
          try {
            await signup(combinedData);
            await signin({
              email: infoStepData.email,
              password: infoStepData.password,
            });
            await fetchUser();
            router.push("/chat/mensagens");
          } catch (err: any) {
            setError(err.response?.data?.message || "Erro no cadastro");
          }
        };

        signupUser();
      }
    }
  }, [
    step,
    infoStepData,
    contactStepData,
    planStepData,
    signup,
    fetchUser,
    router,
  ]);

  return (
    <section className="flex w-full max-w-md grow flex-col items-center justify-center gap-5">
      <h2 className="w-full text-center text-3xl font-bold">Criar Conta</h2>
      {error && <div className="text-red-500">{error}</div>}{" "}
      {step === 1 && (
        <InfoStep
          infoStepData={infoStepData}
          setInfoStepData={setInfoStepData}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <ContactStep
          contactStepData={contactStepData}
          setContactStepData={setContactStepData}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <PlanStep
          planStepData={planStepData}
          setPlanStepData={setPlanStepData}
          setStep={setStep}
        />
      )}
    </section>
  );
}
