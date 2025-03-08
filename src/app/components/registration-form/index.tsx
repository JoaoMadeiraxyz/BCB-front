"use client";

import { useEffect, useState } from "react";
import { InfoStep } from "./info-step";
import { z } from "zod";

import { infoStepSchema } from "./info-step";
import { ContactStep, contactStepSchema } from "./contact-step";

export function RegistrationForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [infoStepData, setInfoStepData] =
    useState<z.infer<typeof infoStepSchema>>();
  const [contactStepData, setContactStepData] =
    useState<z.infer<typeof contactStepSchema>>();

  useEffect(() => {
    console.log({ infoStepData });
  }, [infoStepData]);

  useEffect(() => {
    console.log({ contactStepData });
  }, [contactStepData]);

  return (
    <section className="flex w-full max-w-md grow flex-col items-center justify-center gap-5">
      <h2 className="w-full text-center text-3xl font-bold">Criar Conta</h2>

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
    </section>
  );
}
