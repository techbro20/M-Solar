export interface Payment {
  id: number | string;
  amount: number;
  method: string;
  date: string;
  reference?: string;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  product: string;
  totalCost: number;
  amountPaid: number;
  balance: number;
  status: 'Active' | 'Completed' | 'Pending';
  dateAdded: string;
  lastPayment?: string;
  address?: string;
  notes?: string;
  paymentHistory?: Payment[];
}
