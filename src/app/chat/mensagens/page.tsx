import { ProtectedRoute } from "@/components/protected-route";

export default function Messages() {
  return (
    <ProtectedRoute>
      <h1>ola</h1>
    </ProtectedRoute>
  );
}
