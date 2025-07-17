import React, { useEffect, useState } from "react";
import ClientList from "../components/clients/ClientList";
import ClientForm from "../components/clients/ClientForm";

const sampleClients = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+254712345678",
    product: "Solar Panel 300W",
    totalCost: 20000,
    amountPaid: 5000,
    balance: 15000,
    status: "Active"
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
    status: "Completed"
  }
];

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setClients(sampleClients);
  }, []);

  return (
    <div className="space-y-6">
      <ClientForm />
      <ClientList clients={clients} />
    </div>
  );
};

export default Clients;
