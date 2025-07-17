import React, { useEffect, useState } from "react";
import ProductGrid from "../components/products/ProductGrid";

const sampleProducts = [
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

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(sampleProducts);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Our Products</h2>
      <ProductGrid products={products} />
    </div>
  );
};

export default Products;
