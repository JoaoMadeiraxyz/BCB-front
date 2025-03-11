import { Message } from "./message";

export type UserData = {
  name: string;
  email: string;
  password: string;
  telefone: string;
  cpf: string;
  cnpj: string;
  companyName: string;
  plan: string;
  credits?: number;
  limit?: number;
  amountToPay?: number;
  messages?: Message[];
};
