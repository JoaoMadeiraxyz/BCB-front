"use client";

import { useAuthStore } from "@/stores/auth-store";
import { ArrowLeftFromLine } from "lucide-react";
import { toast } from "sonner";

export function SignoutButton() {
  const { signout, fetchUser } = useAuthStore();

  async function handleSignOut() {
    signout();
    toast.success("Você foi desconectado.");
    fetchUser();
  }

  return (
    <button
      onClick={handleSignOut}
      className="peer/menu-button ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground flex h-8 w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0"
    >
      <ArrowLeftFromLine
        size={20}
        className="text-sidebar-foreground hover:text-sidebar-accent-foreground"
      />
      Sair
    </button>
  );
}
