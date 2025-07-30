import React from 'react';
import { Product } from '../../pages/Products';

interface ProductGridProps {
  products: Product[];
  isAdmin?: boolean;
  onRemoveProduct?: (productId: number) => void;
}

interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onRemove?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAdmin, onRemove }) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = (): number => {
    return Math.round(((product.price - product.offerPrice) / product.price) * 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
      {isAdmin && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors z-10"
          title="Remove product"
        >
          ×
        </button>
      )}

      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=300&fit=crop';
          }}
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
          {calculateDiscount()}% OFF
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-bold text-green-600">
            {formatPrice(product.offerPrice)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Payment Duration:</span> {product.duration}
        </div>

        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, isAdmin, onRemoveProduct }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No products available</h3>
        <p className="text-gray-500">
          {isAdmin ? "Click 'Add Product' to add your first product." : "Please check back later."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isAdmin={isAdmin}
          onRemove={() => onRemoveProduct?.(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
