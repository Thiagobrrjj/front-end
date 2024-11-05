import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextAuthOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";

interface PrivateLayoutProps {
  children: ReactNode;
}

const Privatelayout = async ({ children }: PrivateLayoutProps) => {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect("/painel");
  }

  return <>{children}</>;
};

export default Privatelayout;
