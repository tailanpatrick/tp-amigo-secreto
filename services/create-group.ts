import { createClient } from "@/utils/supabase/server";

export async function createGroupService(groupName: string){

  const supabase = await createClient();

  const { data: authUser, error: authError } = await supabase.auth.getUser();

  const { data: newGroup, error } = await supabase.from("groups").insert({
    name: groupName,
    owner_id: authUser.user?.id
  })
  .select()
  .single();

  if(error || authError){
    return {
      success: false,
      message: 'Ocorreu um erro ao criar o grupo. Por favor tente novamente.'
    }
  }

  return newGroup;
}
