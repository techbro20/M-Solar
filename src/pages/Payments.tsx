import React, { useEffect, useState } from "react";
import PaymentList from "../components/payments/PaymentList";
import PaymentModal from "../components/payments/PaymentModal";

type Payment = {
  id: number;
  clientId: number;
  amount: number;
  method: string;
  reference: string;
  timestamp: string;
  status: string;
};

type Client = {
  id: number;
  name: string;
  phone: string;
  product: string;
  totalCost: number;
  amountPaid: number;
  balance: number;
  status: string;
  dateAdded: string;
  lastPayment: string;
  paymentHistory: Payment[];
};

const Payments: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const dummyClients: Client[] = [
      {
        id: 1,
        name: "Jane Doe",
        phone: "+254712345678",
        product: "Solar Panel 100W",
        totalCost: 15000,
        amountPaid: 10000,
        balance: 5000,
        status: "Active",
        dateAdded: "2024-01-01",
        lastPayment: "2024-01-20",
        paymentHistory: [
          {
            id: 1,
            clientId: 1,
            amount: 10000,
            method: "MPESA",
            reference: "MP001",
            timestamp: "2024-01-20T10:00:00Z",
            status: "Completed",
          },
        ],
      },
    ];

    const dummyPayments: Payment[] = dummyClients.flatMap((client) =>
      client.paymentHistory.map((payment) => ({
        ...payment,
        clientId: client.id,
      }))
    );

    setClients(dummyClients);
    setPayments(dummyPayments);
  }, []);

  const handleUpdatePayment = (client: Client) => {
    setSelectedClient(client);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (paymentData: {
    clientId: number;
    amount: number;
    method: string;
    reference: string;
  }) => {
    const client = clients.find((c) => c.id === paymentData.clientId);
    if (!client) return;

    const newAmountPaid = client.amountPaid + paymentData.amount;
    const newBalance = client.totalCost - newAmountPaid;
    const newStatus = newBalance <= 0 ? "Completed" : "Active";

    const newPayment: Payment = {
      id: Date.now(),
      clientId: client.id,
      amount: paymentData.amount,
      method: paymentData.method,
      reference: paymentData.reference || `PAY${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "Completed",
    };

    const updatedClient: Client = {
      ...client,
      amountPaid: newAmountPaid,
      balance: Math.max(0, newBalance),
      status: newStatus,
      lastPayment: newPayment.timestamp,
      paymentHistory: [...(client.paymentHistory || []), newPayment],
    };

    setClients((prevClients) =>
      prevClients.map((c) => (c.id === client.id ? updatedClient : c))
    );

    setPayments((prevPayments) => [newPayment, ...prevPayments]);
    setShowPaymentModal(false);
    setSelectedClient(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Total Clients</h3>
          <p className="text-2xl font-bold text-blue-600">{clients.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">
            KSh{" "}
            {clients
              .reduce((sum, client) => sum + client.amountPaid, 0)
              .toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Payments
        </h2>
        <PaymentList payments={payments} clients={clients} />
      </div>

      {showPaymentModal && selectedClient && (
        <PaymentModal
          client={selectedClient}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedClient(null);
          }}
          onPayment={handlePaymentSubmit}
        />
      )}
    </div>
  );
};

export default Payments;
