"use client";

import { AddCreditsModal } from "@/components/add-credits-modal";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useMessagesStore } from "@/stores/messages-store";

export default function Configuracoes() {
  const { user, fetchUser } = useAuthStore();
  const { payBill } = useMessagesStore();

  async function handlePayBill() {
    await payBill();
    await fetchUser();
  }

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h2 className="mb-4 text-xl font-bold">Configurações</h2>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Dados do usuário</h3>

            <div className="flex w-full items-center gap-2">
              <p>Nome:</p>
              <p>{user?.name}</p>
            </div>

            <div className="flex w-full items-center gap-2">
              <p>Email:</p>
              <p>{user?.email}</p>
            </div>

            <div className="flex w-full items-center gap-2">
              <p>CNPJ:</p>
              <p>{user?.cnpj}</p>
            </div>

            <div className="flex w-full items-center gap-2">
              <p>CPF responsável:</p>
              <p>{user?.cpf}</p>
            </div>

            <div className="flex w-full items-center gap-2">
              <p>Nome da empresa:</p>
              <p>{user?.companyName}</p>
            </div>

            <div className="flex w-full items-center gap-2">
              <p>Telefone:</p>
              <p>{user?.telefone}</p>
            </div>

            <div className="flex w-full items-center gap-2">
              <p>Plano:</p>
              <p>{user?.plan}</p>
            </div>
          </div>

          {user?.plan === "pos-pago" && (
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Fatura:</h3>

              <div className="flex w-full items-center gap-2">
                <p>Limite:</p>
                <p>R$ {user?.limit}</p>
              </div>

              <div className="flex w-full items-center gap-2">
                <p>Valor a pagar:</p>
                <p>R$ {user?.amountToPay}</p>
              </div>

              {user?.amountToPay > 0 && (
                <Button
                  onClick={handlePayBill}
                  className="w-fit cursor-pointer"
                >
                  Pagar fatura
                </Button>
              )}
            </div>
          )}

          {user?.plan === "pre-pago" && (
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Fatura:</h3>

              <div className="flex w-full items-center gap-2">
                <p>Créditos:</p>
                <p>R$ {user?.credits}</p>
              </div>

              <AddCreditsModal />
            </div>
          )}
        </section>
      </div>
    </ProtectedRoute>
  );
}
