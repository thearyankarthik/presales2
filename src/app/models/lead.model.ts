export interface Lead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  project?: string;
  source?: string;
  assignedTo?: string;
  status?: string;
  createdAt?: string;
}
