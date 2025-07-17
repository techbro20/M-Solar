import { useEffect, useState } from "react";

const usePayments = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const sampleClients = [
    {
      id: 1,
      name: "John Doe",
    },
    {
      id: 2,
      name: "Jane Smith",
    }
  ];

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setClients(sampleClients);
      setLoading(false);
    }, 500);
  }, []);

  return {
    clients,
    loading
  };
};

export default usePayments;
