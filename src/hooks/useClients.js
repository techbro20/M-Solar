import { useState, useEffect } from 'react';
import { clientService } from '../services/clientService';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clientService.getAllClients();
      setClients(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch clients');
    } finally {
      setLoading(false);
    }
  };

  const createClient = async (clientData) => {
    setLoading(true);
    setError(null);
    try {
      const newClient = await clientService.createClient(clientData);
      setClients(prev => [...prev, newClient]);
      return newClient;
    } catch (err) {
      setError(err.message || 'Failed to create client');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (id, clientData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedClient = await clientService.updateClient(id, clientData);
      setClients(prev => 
        prev.map(client => 
          client._id === id ? updatedClient : client
        )
      );
      return updatedClient;
    } catch (err) {
      setError(err.message || 'Failed to update client');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await clientService.deleteClient(id);
      setClients(prev => prev.filter(client => client._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete client');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateClientPayment = async (id, paymentData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedClient = await clientService.updateClientPayment(id, paymentData);
      setClients(prev => 
        prev.map(client => 
          client._id === id ? updatedClient : client
        )
      );
      return updatedClient;
    } catch (err) {
      setError(err.message || 'Failed to update payment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return {
    clients,
    loading,
    error,
    refetch: fetchClients,
    createClient,
    updateClient,
    deleteClient,
    updateClientPayment
  };
};