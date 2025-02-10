import { Participant } from "@/types/Participant";

export function drawGroup(participants: Participant[]): Participant[] {

  const shuffledParticipants = [...participants];


  for (let i = shuffledParticipants.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledParticipants[i], shuffledParticipants[j]] = [shuffledParticipants[j], shuffledParticipants[i]];
  }


  return shuffledParticipants.map((participant, index) => ({
    ...participant,
    assigned_to: shuffledParticipants[(index + 1) % shuffledParticipants.length].id,
  }));
}
