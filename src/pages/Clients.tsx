import React, { useEffect, useState } from "react";
import ClientList from "../components/clients/ClientList";
import ClientForm from "../components/clients/ClientForm";
import ClientDetails from "../components/clients/ClientDetails";
import PaymentModal from "../components/payments/PaymentModal";
import { Client, Payment } from "../types/Client";

const sampleClients: Client[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+254712345678",
    product: "Solar Panel 300W",
    totalCost: 20000,
    amountPaid: 5000,
    balance: 15000,
    status: "Active",
    dateAdded: "2024-01-15",
    lastPayment: "2024-01-20",
    paymentHistory: [
      { id: 1, amount: 5000, date: "2024-01-20", method: "M-Pesa", reference: "MP240120001" }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+254723456789",
    product: "Complete Solar Kit",
    totalCost: 70000,
    amountPaid: 70000,
    balance: 0,
    status: "Completed",
    dateAdded: "2024-01-10",
    lastPayment: "2024-01-25",
    paymentHistory: [
      { id: 1, amount: 35000, date: "2024-01-15", method: "Bank Transfer", reference: "BT240115001" },
      { id: 2, amount: 35000, date: "2024-01-25", method: "M-Pesa", reference: "MP240125001" }
    ]
  }
];

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);

  useEffect(() => {
    setClients(sampleClients);
  }, []);

  // Add new client
  interface NewClientData {
    name: string;
    email: string;
    phone: string;
    product: string;
    totalCost: number;
  }

  // Payment and Client interfaces are now imported from ../types/Client

  const handleAddClient = async (newClientData: NewClientData): Promise<void> => {
    const newClient: Client = {
      ...newClientData,
      id: Math.max(...clients.map(c => c.id), 0) + 1,
      amountPaid: 0,
      balance: newClientData.totalCost,
      status: "Active",
      dateAdded: new Date().toISOString().split('T')[0],
      lastPayment: undefined,
      paymentHistory: []
    };
    
    setClients(prevClients => [...prevClients, newClient]);
    setShowClientForm(false);
    return;
  };

  // Update client information
  const handleUpdateClient = (updatedClient: Client) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
    setSelectedClient(updatedClient);
  };

  // Process payment
  interface PaymentData {
    clientId: number;
    amount: number;
    method: string;
    reference?: string;
  }

  interface NewPayment {
    id: number;
    amount: number;
    date: string;
    method: string;
    reference: string;
  }

  const handlePayment = (paymentData: PaymentData): void => {
    const { clientId, amount, method, reference } = paymentData;
    
    setClients(prevClients =>
      prevClients.map(client => {
        if (client.id === clientId) {
          const newAmountPaid = client.amountPaid + amount;
          const newBalance = client.totalCost - newAmountPaid;
          const newStatus = newBalance <= 0 ? "Completed" : "Active";
          
          const newPayment: NewPayment = {
            id: (client.paymentHistory?.length || 0) + 1,
            amount,
            date: new Date().toISOString().split('T')[0],
            method,
            reference: reference || `PAY${Date.now()}`
          };

          const updatedClient: Client = {
            ...client,
            amountPaid: newAmountPaid,
            balance: Math.max(0, newBalance),
            status: newStatus,
            lastPayment: newPayment.date,
            paymentHistory: [...(client.paymentHistory || []), newPayment]
          };

          // Update selectedClient if it's the same client
          if (selectedClient && selectedClient.id === clientId) {
            setSelectedClient(updatedClient);
          }

          return updatedClient;
        }
        return client;
      })
    );
    
    setShowPaymentModal(false);
  };

  // View client details
  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };

  // Update payment for a client
  interface UpdatePaymentHandler {
    (client: Client): void;
  }

  const handleUpdatePayment: UpdatePaymentHandler = (client) => {
    setSelectedClient(client);
    setShowPaymentModal(true);
  };

  // Delete client
  const handleDeleteClient = (clientId: number): void => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients((prevClients: Client[]) => prevClients.filter((client: Client) => client.id !== clientId));
      if (selectedClient && selectedClient.id === clientId) {
        setSelectedClient(null);
        setShowClientDetails(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Client Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
        <button
          onClick={() => setShowClientForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Add New Client
        </button>
      </div>

      {/* Client Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Total Clients</h3>
          <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Active Clients</h3>
          <p className="text-2xl font-bold text-green-600">
            {clients.filter(c => c.status === 'Active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-blue-600">
            {clients.filter(c => c.status === 'Completed').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">
            KSh {clients.reduce((sum, client) => sum + client.amountPaid, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Client Form Modal */}
      {showClientForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Client</h2>
              <button
                onClick={() => setShowClientForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <ClientForm 
              onSubmit={handleAddClient}
              onCancel={() => setShowClientForm(false)}
            />
          </div>
        </div>
      )}

      {/* Client List with Actions */}
      <ClientList 
        clients={clients}
        onViewDetails={handleViewDetails}
        onUpdatePayment={handleUpdatePayment}
        onDeleteClient={handleDeleteClient}
        onUpdateClient={handleUpdateClient}
      />

      {/* Client Details Modal */}
      {showClientDetails && selectedClient && (
        <ClientDetails
          client={selectedClient}
          onClose={() => setShowClientDetails(false)}
          onUpdatePayment={() => {
            setShowClientDetails(false);
            setShowPaymentModal(true);
          }}
          onUpdateClient={handleUpdateClient}
        />
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedClient && (
        <PaymentModal
          client={selectedClient}
          onClose={() => setShowPaymentModal(false)}
          onPayment={handlePayment}
        />
      )}
    </div>
  );
};

export default Clients;