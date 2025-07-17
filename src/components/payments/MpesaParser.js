import React from "react";

const MpesaParser = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">M-Pesa Message Parser</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Paste M-Pesa Message</label>
          <textarea 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-32"
            placeholder="Paste M-Pesa confirmation message here..."
          />
        </div>
        <button className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg text-white font-semibold">
          Parse & Save Payment
        </button>
      </div>
    </div>
  );
};

export default MpesaParser;
