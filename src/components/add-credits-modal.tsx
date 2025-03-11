import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMessagesStore } from "@/stores/messages-store";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";

const addCreditsSchema = z.object({
  amount: z.number().min(1, "O valor deve ser maior que zero"),
});

export function AddCreditsModal() {
  const [open, setOpen] = useState(false);
  const { addCredits, loading, error } = useMessagesStore();
  const { fetchUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addCreditsSchema),
  });

  const onSubmit = async (data: z.infer<typeof addCreditsSchema>) => {
    await addCredits(data.amount);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Créditos adicionados com sucesso!");
      await fetchUser();
      setOpen(false);
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit cursor-pointer">Adicionar Créditos</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Créditos</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="number"
            placeholder="Quantidade de créditos"
            {...register("amount", { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? "Adicionando..." : "Adicionar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
