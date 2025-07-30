import React, { useState } from 'react';
import { Client } from '../../types/Client';

interface ClientDetailsProps {
  client: Client;
  onClose: () => void;
  onUpdatePayment: () => void;
  onUpdateClient: (updatedClient: Client) => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({
  client,
  onClose,
  onUpdatePayment,
  onUpdateClient,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (amount: number): string => {
    return `KSh ${amount.toLocaleString()}`;
  };

  interface FormatDateOptions {
    year: 'numeric';
    month: 'short';
    day: 'numeric';
  }

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    } as FormatDateOptions);
  };

  interface StatusBadgeProps {
    status: string;
  }

  const getStatusBadge = (status: StatusBadgeProps['status']): string => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'Active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Completed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  interface UpdatedClientData extends Partial<Client> {}

  const handleUpdateClient = async (updatedData: UpdatedClientData): Promise<void> => {
    const updatedClient: Client = {
      ...client,
      ...updatedData
    };
    onUpdateClient(updatedClient);
    setIsEditing(false);
  };

  const paymentPercentage = client.totalCost > 0 ? (client.amountPaid / client.totalCost) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-lg font-medium text-white">
                {client.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
              <span className={getStatusBadge(client.status)}>
                {client.status}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Payment History
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'edit'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Edit Details
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="p-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-600">Total Cost</h3>
                  <p className="text-2xl font-bold text-blue-900">{formatCurrency(client.totalCost)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-green-600">Amount Paid</h3>
                  <p className="text-2xl font-bold text-green-900">{formatCurrency(client.amountPaid)}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-red-600">Balance</h3>
                  <p className="text-2xl font-bold text-red-900">{formatCurrency(client.balance)}</p>
                </div>
              </div>

              {/* Payment Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Payment Progress</h3>
                  <span className="text-sm text-gray-600">{Math.round(paymentPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(paymentPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Client Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Contact Information</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <span className="text-gray-900">{client.email}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-900">{client.phone}</span>
                      </div>
                      {client.address && (
                        <div className="flex items-start">
                          <svg className="w-4 h-4 text-gray-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-900">{client.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {client.notes && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Notes</h3>
                      <p className="mt-2 text-gray-900">{client.notes}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Project Information</h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <span className="text-sm text-gray-500">Product:</span>
                        <span className="ml-2 text-gray-900 font-medium">{client.product}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Date Added:</span>
                        <span className="ml-2 text-gray-900">{formatDate(client.dateAdded)}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Last Payment:</span>
                        <span className="ml-2 text-gray-900">{formatDate(client.lastPayment)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
                {client.status !== 'Completed' && (
                  <button
                    onClick={onUpdatePayment}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Add Payment
                  </button>
                )}
              </div>

              {client.paymentHistory && client.paymentHistory.length > 0 ? (
                <div className="space-y-3">
                  {client.paymentHistory.map((payment) => (
                    <div key={payment.id} className="bg-gray-50 rounded-lg p-4 border">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-green-600">
                              {formatCurrency(payment.amount)}
                            </span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-600">{payment.method}</span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {formatDate(payment.date)}
                          </div>
                          {payment.reference && (
                            <div className="text-xs text-gray-400 mt-1">
                              Ref: {payment.reference}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No payments recorded</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Payment history will appear here once payments are made.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'edit' && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Client Details</h3>
              <ClientForm
                initialData={{
                  ...client,
                  address: client.address ?? '',
                  notes: client.notes ?? '',
                  totalCost: client.totalCost.toString(),
                }}
                onSubmit={handleUpdateClient}
                onCancel={() => setActiveTab('overview')}
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {activeTab === 'overview' && (
          <div className="bg-gray-50 px-6 py-4 border-t flex justify-end space-x-3">
            {client.status !== 'Completed' && (
              <button
                onClick={onUpdatePayment}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Add Payment
              </button>
            )}
            <button
              onClick={() => setActiveTab('edit')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Edit Client
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetails;

// Remove duplicate useState implementations. Use React's useState instead.
