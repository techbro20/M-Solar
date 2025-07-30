import React, { useState } from 'react';

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  product: string;
  totalCost: string;
  address: string;
  notes: string;
}

interface ClientFormProps {
  onSubmit: (data: Omit<ClientFormData, 'totalCost'> & { totalCost: number }) => Promise<void>;
  onCancel: () => void;
  initialData?: ClientFormData | null;
}

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState<ClientFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    product: initialData?.product || '',
    totalCost: initialData?.totalCost || '',
    address: initialData?.address || '',
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ClientFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ClientFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^\+254[0-9]{9}$/.test(formData.phone)) newErrors.phone = 'Invalid Kenyan phone number';
    if (!formData.product.trim()) newErrors.product = 'Product is required';
    if (!formData.totalCost || isNaN(Number(formData.totalCost)) || Number(formData.totalCost) <= 0)
      newErrors.totalCost = 'Valid total cost required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ClientFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const payload = {
      ...formData,
      totalCost: parseFloat(formData.totalCost),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      product: formData.product.trim(),
      address: formData.address.trim(),
      notes: formData.notes.trim(),
    };

    try {
      await onSubmit(payload);
      if (!initialData) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          product: '',
          totalCost: '',
          address: '',
          notes: '',
        });
      }
    } catch (err) {
      console.error('Form submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const solarProducts = ['Solar Panel 100W', 'Complete Solar Kit - Premium', 'Custom Solar Solution'];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" />
      <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
      <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" />
      <select name="product" value={formData.product} onChange={handleInputChange}>
        <option value="">Select Product</option>
        {solarProducts.map((p, i) => (
          <option key={i} value={p}>{p}</option>
        ))}
      </select>
      <input name="totalCost" value={formData.totalCost} onChange={handleInputChange} placeholder="Total Cost" />
      <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" />
      <textarea name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Notes" />

      <div className="flex gap-2">
        <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded">
          {isSubmitting ? 'Saving...' : 'Save Client'}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
