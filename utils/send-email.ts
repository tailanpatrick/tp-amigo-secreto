import { Participant } from '@/types/Participant';
import nodemailer from 'nodemailer';

export async function sendEmail(participants: Participant[], groupName: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const participantsMap = new Map(participants.map(p => [p.id, p.name]));

    const emailPromises = participants.map((participant) => {

      const assignedName = participantsMap.get(participant.assigned_to || '');

      if (!assignedName) {
        throw new Error(`Participante sorteado não encontrado para ${participant.name}`);
      }

      return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: participant.email,
        subject: `Sorteio de Amigo Oculto - ${groupName}`,
        html: `<p>Você está participando do amigo secreto do grupo "${groupName}".<br/><br/>
        O seu amigo secreto é <strong>${assignedName}</strong></p>`,
      });
    });

    await Promise.all(emailPromises);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error };
  }
}
