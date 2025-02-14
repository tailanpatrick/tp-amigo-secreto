import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TextRevealCard, TextRevealCardDescription, TextRevealCardTitle } from "@/components/ui/TextRevealCardWrapper";
import { Participant } from "@/types/Participant";
import { createClient } from "@/utils/supabase/server";

const fetchGroupData = async (groupId: string) => {
  const supabase = await createClient();
  const { data: authUser } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("groups")
    .select("name, participants(*)")
    .eq("id", groupId)
    .single();

  if (error) {
    throw new Error("Erro ao carregar o grupo");
  }

  const assignedParticipantId = data.participants.find(
    (p: Participant) => p.email === authUser.user?.email
  )?.assigned_to;

  const assignedParticipant = data.participants.find(
    (p: Participant) => p.id === assignedParticipantId
  );

  return { data, assignedParticipant };
};

const GroupIdPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  try {
    const { data, assignedParticipant } = await fetchGroupData( (await params).id);

    return (
      <main className="container mx-auto py-6">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl mb-6">
                Grupo{" "}
                <span className="font-light underline decoration-red-400">
                  {data.name}
                </span>
              </CardTitle>
            </div>
            <CardDescription>
              Informações do grupo e participantes
            </CardDescription>

            <CardContent>
              <h2 className="text-xl font-semibold mb-4">Participantes</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.participants.map((participant) => (
                    <TableRow key={participant.id}>
                      <TableCell>{participant.name}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Separator className="my-6" />

              <TextRevealCard
                text="Passe o mouse ou arraste o dedo na tela para revelar"
                revealText={assignedParticipant?.name || "N/A"}
                className="w-full font-bold"
              >
                <TextRevealCardTitle>
                  Veja quem você tirou no Amigo Oculto &quot;{data.name}&quot;
                </TextRevealCardTitle>
                <TextRevealCardDescription>
                  😍
                </TextRevealCardDescription>
              </TextRevealCard>
            </CardContent>
          </CardHeader>
        </Card>
      </main>
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return <p>Erro ao carregar o grupo:</p>;
  }
};

export default GroupIdPage;
