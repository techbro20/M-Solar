import React from "react";
import { ShoppingCart, DollarSign, Users } from "lucide-react";

const FeaturesSection = () => (
  <div className="grid md:grid-cols-3 gap-8 mt-12">
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <ShoppingCart className="text-white" size={32} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Quality Products</h3>
      <p className="text-gray-300">
        High-quality solar panels and equipment with warranty
      </p>
    </div>

    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <DollarSign className="text-white" size={32} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Flexible Payment</h3>
      <p className="text-gray-300">
        Easy installment plans to fit your budget
      </p>
    </div>

    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Users className="text-white" size={32} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Expert Support</h3>
      <p className="text-gray-300">
        Professional installation and ongoing support
      </p>
    </div>
  </div>
);

export default FeaturesSection;
