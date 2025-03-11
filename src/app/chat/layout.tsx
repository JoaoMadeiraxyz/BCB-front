import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Big Chat Brasil",
  description:
    "O mais novo e interessante enviador de SMS e outras mensagens brasileiro.",
};

function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className={`${poppins.variable} !px-8 !py-5 antialiased`}>
        <SidebarTrigger />
        <ClientWrapper>{children}</ClientWrapper>
      </div>
    </SidebarProvider>
  );
}
