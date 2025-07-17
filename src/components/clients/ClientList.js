import React from "react";

const ClientList = ({ clients }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total Cost</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Paid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Balance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{client.name}</div>
                  <div className="text-sm text-gray-300">{client.email}</div>
                  <div className="text-sm text-gray-300">{client.phone}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">{client.product}</td>
                <td className="px-6 py-4 text-sm text-gray-300">KSh {client.totalCost.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-green-400">KSh {client.amountPaid.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-red-400">KSh {client.balance.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    client.status === 'Completed' 
                      ? 'bg-green-800 text-green-200' 
                      : 'bg-orange-800 text-orange-200'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button className="text-orange-400 hover:text-orange-300 mr-4">Update Payment</button>
                  <button className="text-blue-400 hover:text-blue-300">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
