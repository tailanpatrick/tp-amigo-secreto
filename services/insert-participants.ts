import { Participant } from "@/types/Participant";
import { createClient } from "@/utils/supabase/server";

export async function insertParticipantsService(participants: Participant[]) {
  const supabase = await createClient();

  const { data: authUser, error: authError } = await supabase.auth.getUser();

  if (authError || !authUser) {
    return {
      success: false,
      message: 'Usuário não autenticado ou ocorreu um erro ao obter o usuário.',
    };
  }

  const { data: newParticipants, error } = await supabase
    .from("participants")
    .insert(participants)
    .select();

  if (error) {
    return {
      success: false,
      message: 'Ocorreu um erro ao adicionar os participantes ao grupo. Por favor, tente novamente.',
    };
  }

  return {
    success: true,
    data: newParticipants,
  };
}
