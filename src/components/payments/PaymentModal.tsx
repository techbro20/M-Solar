import React, { useState } from 'react';

interface Client {
  id: number;
  name: string;
  phone: string;
  balance: number;
}

interface PaymentData {
  clientId: number;
  amount: number;
  method: string;
  reference: string;
}

interface PaymentModalProps {
  client: Client;
  onClose: () => void;
  onPayment: (payment: PaymentData) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ client, onClose, onPayment }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('M-Pesa');
  const [reference, setReference] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payment = {
      clientId: client.id,
      amount: parseFloat(amount),
      method,
      reference,
    };

    if (payment.amount > 0) {
      onPayment(payment);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Add Payment for {client.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full border p-2 rounded"
          />
          <select value={method} onChange={e => setMethod(e.target.value)} className="w-full border p-2 rounded">
            <option value="M-Pesa">M-Pesa</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          <input
            type="text"
            value={reference}
            onChange={e => setReference(e.target.value)}
            placeholder="Reference (optional)"
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
