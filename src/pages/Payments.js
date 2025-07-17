import React, { useEffect, useState } from "react";
import PaymentForm from "../components/payments/PaymentForm";
import MpesaParser from "../components/payments/MpesaParser";

const sampleClients = [
  {
    id: 1,
    name: "John Doe"
  },
  {
    id: 2,
    name: "Jane Smith"
  }
];

const Payments = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setClients(sampleClients);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Payment Management</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <PaymentForm clients={clients} />
        <MpesaParser />
      </div>
    </div>
  );
};

export default Payments;
