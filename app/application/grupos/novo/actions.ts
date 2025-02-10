"use server";
import { CreateGroupState } from '@/types/CreateGroupState';
import { createGroupService } from '@/services/create-group';
import { insertParticipantsService } from '@/services/insert-participants';
import { Participant } from '@/types/Participant';
import { drawGroup } from '@/utils/draw-group';
import { updateParticipantsService } from '@/services/update-participants';

export async function createGroup(
  previousState: CreateGroupState,
  formData: FormData
): Promise<CreateGroupState> {
  try {
    const names = formData.getAll("name");
    const emails = formData.getAll("email");
    const groupName = formData.get("group-name");

    if (!groupName || names.length === 0 || emails.length === 0) {
      return {
        success: false,
        message: 'Dados do formulário incompletos.',
      };
    }

    const newGroup = await createGroupService(groupName as string);

    const participants = names.map((name, index) => ({
      group_id: newGroup.id,
      name: name as string,
      email: emails[index] as string,
    })) as Participant[];

    const { success, message, data: newParticipants } = await insertParticipantsService(participants);

    if (!success || !newParticipants) {
      return {
        success: false,
        message: message || 'Erro ao inserir participantes.',
      };
    }

    const drawnParticipants = drawGroup(newParticipants);

    const drawnedParticipants = await updateParticipantsService(drawnParticipants);

    return {
      success: true,
      message: 'Grupo criado e participantes sorteados com sucesso.',
    };

  } catch (error) {
    return {
      success: false,
      message: 'Ocorreu um erro inesperado.'+ error,
    };
  }
}
