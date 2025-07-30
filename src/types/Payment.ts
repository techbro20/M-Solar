export interface Payment {
  id?: number;
  clientId: number;
  amount: number;
  method: string;
  reference: string;
  phone: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed' | string;
}
