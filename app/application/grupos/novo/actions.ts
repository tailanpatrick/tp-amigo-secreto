"use server";
import { CreateGroupState } from '@/types/CreateGroupState';
import { createGroupService } from '@/services/create-group';
import { insertParticipantsService } from '@/services/insert-participants';
import { Participant } from '@/types/Participant';
import { drawGroup } from '@/utils/draw-group';
import { updateParticipantsService } from '@/services/update-participants';
import { sendEmail } from '@/utils/send-email';

export async function createGroup(
  previousState: CreateGroupState,
  formData: FormData
): Promise<CreateGroupState> {
  try {
    const names = formData.getAll("name");
    const emails = formData.getAll("email");
    const groupName = formData.get("group-name") as string | null;

    if (!groupName || names.length === 0 || emails.length === 0) {
      return {
        success: false,
        message: 'Dados do formulário incompletos.',
      };
    }

    const newGroup = await createGroupService(groupName);

    const participants = names.map((name, index) => ({
      group_id: newGroup.id,
      name: name as string,
      email: emails[index] as string,
    })) as Participant[];

    const response = await insertParticipantsService(participants);

    if (!response.success || !Array.isArray(response.data)) {
      return {
        success: false,
        message: response.message || 'Erro ao inserir participantes.',
      };
    }

    const drawnParticipants = drawGroup(response.data);

    const updateResponse = await updateParticipantsService(drawnParticipants);

    if (!updateResponse || !Array.isArray(updateResponse.data)) {
      return {
        success: false,
        message: 'Erro ao atualizar participantes.',
      };
    }

    const { success: emailSuccess } = await sendEmail(updateResponse.data, groupName);

    if (!emailSuccess) {
      return {
        success: false,
        message: 'Erro ao enviar e-mails.',
      };
    }

    return {
      success: true,
      message: 'Grupo criado e participantes sorteados com sucesso.',
      groupId: newGroup.id,
    };


  } catch (error) {
    return {
      success: false,
      message: 'Ocorreu um erro inesperado: ' + error,
    };
  }
}
