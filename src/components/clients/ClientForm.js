import React from "react";

const ClientForm = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-white">Client Management</h2>
      <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white font-semibold">
        Add New Client
      </button>
    </div>
  );
};

export default ClientForm;
