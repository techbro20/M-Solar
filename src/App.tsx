import React, { useState, useEffect } from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Payments from "./pages/Payments";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import LoginModal from "./components/auth/LoginModal";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      setActiveTab("dashboard");
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab("home");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setIsAuthenticated(true);
          setShowLoginModal(false);
        }}
      />

      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setShowLoginModal(true)}
        onLogoutClick={handleLogout}
      />

      <main className="container mx-auto px-4 py-8">
        {activeTab === "home" && <Home />}
        {activeTab === "products" && <Products />}
        {activeTab === "dashboard" && isAuthenticated && <Dashboard />}
        {activeTab === "clients" && isAuthenticated && <Clients />}
        {activeTab === "payments" && isAuthenticated && <Payments />}
      </main>

      <Footer />
    </div>
  );
};

export default App;
