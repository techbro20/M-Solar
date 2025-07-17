import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const solarProducts = [
    {
      id: 1,
      name: "Solar Panel 300W",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&h=300&fit=crop",
      price: 25000,
      offerPrice: 20000,
      duration: "12 months",
      description: "High efficiency monocrystalline solar panel",
    },
    {
      id: 2,
      name: "Solar Inverter 3000W",
      image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=400&h=300&fit=crop",
      price: 45000,
      offerPrice: 38000,
      duration: "18 months",
      description: "Pure sine wave solar inverter with MPPT",
    },
    {
      id: 3,
      name: "Solar Battery 100Ah",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      price: 18000,
      offerPrice: 15000,
      duration: "8 months",
      description: "Deep cycle lithium battery for solar systems",
    },
    {
      id: 4,
      name: "Complete Solar Kit",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop",
      price: 85000,
      offerPrice: 70000,
      duration: "24 months",
      description: "Complete solar system for home use",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % solarProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % solarProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + solarProducts.length) % solarProducts.length);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg bg-gray-900">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {solarProducts.map((product) => (
          <div key={product.id} className="w-full flex-shrink-0 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
                <p className="text-lg mb-4">{product.description}</p>
                <div className="flex justify-center items-center gap-4 mb-4">
                  <span className="text-2xl font-bold text-orange-400">
                    KSh {product.offerPrice.toLocaleString()}
                  </span>
                  <span className="text-lg line-through text-gray-300">
                    KSh {product.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-orange-300 mb-4">Payment Duration: {product.duration}</p>
                <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {solarProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-orange-500" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
