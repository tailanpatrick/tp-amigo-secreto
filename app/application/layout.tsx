import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import Header from "@/components/header";

const AppLayout = async ({
  children
}:
  Readonly<{
    children: React.ReactNode
  }>
) => {

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default AppLayout;
