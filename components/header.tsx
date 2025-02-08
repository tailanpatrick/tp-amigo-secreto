import { UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">

          <Link href="/">
            <Image className="rounded-sm" src="/img/logo.jpg" alt="Logo" width={70} height={90} />
          </Link>

          <nav className="flex items-center space-x-4">
            <Link href="/application/grupos" className="text-foreground text-sm flex gap-2 md:mr-4 items-center justify-center">
              <UsersRound className="w-5 h-5"/>
              Meus Grupos
            </Link>

            <Button asChild variant="outline">
              <Link className="text-white" href="/application/grupos/novo">Novo Grupo</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
