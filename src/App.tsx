import React, { useState } from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Payments from "./pages/Payments";
import Products from "./pages/Products";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Page Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "home" && <Home />}
        {activeTab === "clients" && <Clients />}
        {activeTab === "payments" && <Payments />}
        {activeTab === "products" && <Products />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
