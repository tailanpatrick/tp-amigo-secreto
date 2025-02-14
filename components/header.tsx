"use client";

import { UsersRound, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const Header = () => {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const isGroupPage =
    pathname.startsWith("/application/grupos/") &&
    pathname !== "/application/grupos";

  const isNewGroupPage = pathname === "/application/grupos/novo";

  return (
    <header className="border-b">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link href="/application/grupos">
            <Image className="rounded-sm" src="/img/logo.jpg" alt="Logo" width={70} height={90} />
          </Link>

          <nav className="flex items-center space-x-4">
            {pathname !== "/application/grupos" && (
              <Link href="/application/grupos" className="text-foreground text-sm flex gap-2 md:mr-4 items-center">
                <UsersRound className="w-5 h-5" />
                Meus Grupos
              </Link>
            )}

            {!isGroupPage && !isNewGroupPage && (
              <Button asChild variant="outline" className="text-white">
                <Link href="/application/grupos/novo">Novo Grupo</Link>
              </Button>
            )}

            <Button onClick={handleLogout} variant="destructive" className="flex items-center gap-2">
              <LogOut className="w-5 h-5" />
              Sair
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
