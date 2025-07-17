import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-white">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-300 mb-3">{product.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-orange-400 font-semibold">
            KSh {product.offerPrice.toLocaleString()}
          </span>
          <span className="line-through text-gray-400 text-sm">
            KSh {product.price.toLocaleString()}
          </span>
        </div>
        <p className="text-sm text-orange-300 mb-4">
          Payment Duration: {product.duration}
        </p>
        <button className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded-lg font-semibold">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
