export interface Participant {
  id?: string;
  group_id?: string;
  name: string;
  email:string;
  assigned_to?: string | null;
  created_at?: string;
}
