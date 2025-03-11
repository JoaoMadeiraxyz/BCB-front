"use client";

import { useState } from "react";
import { useMessagesStore } from "@/stores/messages-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";

const messageSchema = z.object({
  telefone: z.string().min(10, "Telefone inválido"),
  content: z.string().min(1, "A mensagem é obrigatória"),
  type: z.enum(["whatsapp", "sms"], { required_error: "O tipo é obrigatório" }),
});

export default function CreateMessageModal() {
  const [open, setOpen] = useState(false);
  const { sendMessage, error, loading } = useMessagesStore();
  const { fetchUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      await sendMessage(data);
      if (!error && !loading) {
        fetchUser();
        setOpen(false);
        reset();
      } else {
        if (error === "Insufficient credits.") {
          toast.error("Você não possui créditos suficiente.");
          return;
        }

        if (error === "Limit exceeded.") {
          toast.error(
            "Você excedeu o seu limite, pague a fatura para enviar mais mensages.",
          );
          return;
        }

        toast.error("Houve um erro ao enviar a mensagem.");
      }
    } catch (err) {
      toast.error("Houve um erro ao enviar a mensagem.");
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div title="Criar mensagem" className="cursor-pointer">
          <Plus
            size={20}
            className="text-sidebar-foreground hover:text-sidebar-accent-foreground"
          />{" "}
          <span className="sr-only">Criar mensagem</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Mensagem</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <fieldset className="space-y-2">
            <Label>Telefone</Label>
            <Input {...register("telefone")} placeholder="Digite o telefone" />
            {errors.telefone && (
              <p className="text-sm text-red-500">{errors.telefone.message}</p>
            )}
          </fieldset>
          <fieldset className="space-y-2">
            <Label>Mensagem</Label>
            <Input {...register("content")} placeholder="Digite a mensagem" />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </fieldset>
          <fieldset className="space-y-2">
            <Label>Tipo</Label>
            <Select
              onValueChange={(value: "whatsapp" | "sms") =>
                setValue("type", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </fieldset>
          <Button
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-500"
            type="submit"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
