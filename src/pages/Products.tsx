// src/pages/Products.tsx
import React, { useEffect, useState } from "react";
import ProductGrid from "../components/products/ProductGrid";

// Define the Product interface
export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  offerPrice: number;
  duration: string;
  description: string;
}

// Sample products data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Solar Panel 300W",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=300&fit=crop",
    price: 25000,
    offerPrice: 20000,
    duration: "12 months",
    description: "High efficiency monocrystalline solar panel"
  },
  {
    id: 2,
    name: "Solar Inverter 3000W",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400&h=300&fit=crop",
    price: 45000,
    offerPrice: 38000,
    duration: "18 months",
    description: "Pure sine wave solar inverter with MPPT"
  },
  {
    id: 3,
    name: "Solar Battery 100Ah",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    price: 18000,
    offerPrice: 15000,
    duration: "8 months",
    description: "Deep cycle lithium battery for solar systems"
  },
  {
    id: 4,
    name: "Complete Solar Kit",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop",
    price: 85000,
    offerPrice: 70000,
    duration: "24 months",
    description: "Complete solar system for home use"
  }
];

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    image: '',
    price: 0,
    offerPrice: 0,
    duration: '',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" || name === "offerPrice" ? Number(value) : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      newErrors.price = 'Valid price is required';
    if (!formData.offerPrice || isNaN(formData.offerPrice) || formData.offerPrice <= 0)
      newErrors.offerPrice = 'Valid offer price is required';
    if (formData.offerPrice >= formData.price)
      newErrors.offerPrice = 'Offer price must be less than regular price';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddProduct(formData);
      setFormData({
        name: '',
        image: '',
        price: 0,
        offerPrice: 0,
        duration: '',
        description: ''
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Add New Product</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "image", "duration", "description"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)} *
                </label>
                {field === "description" ? (
                  <textarea
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors[field] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={`Enter ${field}`}
                  />
                ) : (
                  <input
                    type={field === "image" ? "url" : "text"}
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md ${
                      errors[field] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={`Enter ${field}`}
                  />
                )}
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}

            {["price", "offerPrice"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field === "price" ? "Price (KES)" : "Offer Price (KES)"} *
                </label>
                <input
                  type="number"
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors[field] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                  min="1"
                />
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={onClose} className="flex-1 bg-gray-200 py-2 rounded">Cancel</button>
              <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  useEffect(() => {
    setProducts(sampleProducts);
  }, []);

  const handleAddProduct = (newProductData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleRemoveProduct = (productId: number) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      setProducts(prev => prev.filter(product => product.id !== productId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Our Products</h2>
        {isAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            Add Product
          </button>
        )}
      </div>

      <ProductGrid
        products={products}
        isAdmin={isAdmin}
        onRemoveProduct={handleRemoveProduct}
      />

      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default Products;
