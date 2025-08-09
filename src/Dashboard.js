import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <ul className="dashboard-buttons">
        <li><Link to="/add-agent">Add Agent</Link></li>
        <li><Link to="/upload-csv">Upload CSV</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;