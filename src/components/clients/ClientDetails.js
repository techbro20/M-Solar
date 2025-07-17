import React from "react";

const ClientDetails = ({ client, onClose }) => {
  if (!client) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md text-white relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Client Details</h2>

        <div className="space-y-2">
          <div>
            <span className="font-semibold">Name:</span> {client.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {client.email}
          </div>
          <div>
            <span className="font-semibold">Phone:</span> {client.phone}
          </div>
          <div>
            <span className="font-semibold">Product:</span> {client.product}
          </div>
          <div>
            <span className="font-semibold">Total Cost:</span> KSh {client.totalCost.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Amount Paid:</span> KSh {client.amountPaid.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Balance:</span> KSh {client.balance.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-2 py-1 text-sm font-semibold rounded-full ${
                client.status === "Completed"
                  ? "bg-green-800 text-green-200"
                  : "bg-orange-800 text-orange-200"
              }`}
            >
              {client.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
