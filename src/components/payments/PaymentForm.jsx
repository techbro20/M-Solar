import React from "react";

const PaymentForm = ({ clients }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Record Payment</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Client</label>
          <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
            <option>Select Client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
          <input 
            type="number" 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Payment Method</label>
          <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white">
            <option>M-Pesa</option>
            <option>Bank Transfer</option>
            <option>Cash</option>
          </select>
        </div>
        <button className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded-lg text-white font-semibold">
          Record Payment
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
