import { createClient } from "@/utils/supabase/server";

import NewGroupForm from "@/components/new-group-form";

const NewGroupPage = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const loggedUser = {
    id: data?.user?.id as string,
    email: data?.user?.email as string
  }

  return (
    <div className="mt-20 mb-20">
      <NewGroupForm loggedUser={loggedUser}/>
    </div>
  );
}

export default NewGroupPage;
