import React from 'react';

interface Client {
  id: number;
  name: string;
  phone: string;
  balance: number;
}

interface Payment {
  id: number;
  clientId: number;
  amount: number;
  method: string;
  reference: string;
  timestamp: string;
  status: string;
  phone?: string;
}

interface PaymentListProps {
  payments: Payment[];
  clients: Client[];
}

const PaymentList: React.FC<PaymentListProps> = ({ payments, clients }) => {
  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Unknown';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map(payment => (
            <tr key={payment.id}>
              <td className="px-6 py-4 text-sm text-gray-900">{getClientName(payment.clientId)}</td>
              <td className="px-6 py-4 text-sm text-gray-900">KSh {payment.amount.toLocaleString()}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{payment.method}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{payment.reference || '—'}</td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {new Date(payment.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-green-600">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
