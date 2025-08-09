import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import AddAgent from './AddAgent';
import UploadCSV from './UploadCSV';


function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();


  if (location.pathname === "/") return null;

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <Link className="nav-button" to="/dashboard">Dashboard</Link>
      <Link className="nav-button" to="/add-agent">Add Agent</Link>
      <Link className="nav-button" to="/upload-csv">Upload CSV</Link>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-agent" element={<AddAgent />} />
        <Route path="/upload-csv" element={<UploadCSV />} />
      </Routes>
    </Router>
  );
}

export default App;