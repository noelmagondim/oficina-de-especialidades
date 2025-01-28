import React from 'react';
import Header from "./components/header";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import SaturdaySpecialtiesPage from './pages/SaturdaySpecialtiesPage';
import SandaySpecialtiesPage from './pages/SandaySpecialtiesPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/registration" element={<RegistrationPage />} /> 
            <Route path="/saturdaySpecialties" element={<SaturdaySpecialtiesPage />} />
            <Route path="/sandaySpecialties" element={<SandaySpecialtiesPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App
