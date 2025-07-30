import React, { useState } from 'react';
import { Payment } from '../../../types/Payment';



interface MpesaParserProps {
  onPaymentsParsed: (payments: Payment[]) => void;
}

const MpesaParser: React.FC<MpesaParserProps> = ({ onPaymentsParsed }) => {
  const [rawMessage, setRawMessage] = useState('');

  const handleParse = () => {
    // Basic M-Pesa message pattern parsing (mock logic)
    const regex = /([A-Z0-9]{10}) Confirmed\. KSh([\d,]+)\.00 received from (.+?) (\+254\d{9})/gi;
    const matches = [...rawMessage.matchAll(regex)];

    const parsed: Payment[] = matches.map((match, index) => ({
      id: undefined,
      clientId: 0, // Must be matched by phone elsewhere
      amount: parseFloat(match[2].replace(/,/g, '')),
      method: 'M-Pesa',
      reference: match[1],
      phone: match[4],
      timestamp: new Date().toISOString(),
      status: 'completed',
    }));

    if (parsed.length > 0) {
      onPaymentsParsed(parsed);
      setRawMessage('');
    } else {
      alert('No valid M-Pesa messages found.');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-8">
      <h3 className="text-lg font-semibold text-white mb-4">M-Pesa Message Parser</h3>
      <textarea
        value={rawMessage}
        onChange={(e) => setRawMessage(e.target.value)}
        placeholder="Paste M-Pesa confirmation messages here..."
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-32 resize-none"
      />
      <button
        onClick={handleParse}
        className="mt-4 w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg text-white font-semibold"
      >
        Parse & Save Payment
      </button>
    </div>
  );
};

export default MpesaParser;
