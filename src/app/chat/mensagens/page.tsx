"use client";

import { ProtectedRoute } from "@/components/protected-route";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/stores/auth-store";

export default function Messages() {
  const { user } = useAuthStore();

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h2 className="mb-4 text-xl font-bold">Mensagens</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Telefone</TableHead>
              <TableHead>Conteúdo</TableHead>
              <TableHead>Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user?.messages && user.messages.length > 0 ? (
              user.messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{message.telefone}</TableCell>
                  <TableCell>{message.content}</TableCell>
                  <TableCell className="capitalize">{message.type}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="py-4 text-center">
                  Nenhuma mensagem disponível
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </ProtectedRoute>
  );
}
