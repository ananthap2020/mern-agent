import React, { useState, useEffect } from "react";

function AddAgent() {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = () => {
    fetch("http://localhost:5000/api/agents")
      .then((res) => res.json())
      .then((data) => setAgents(data))
      .catch((err) => console.error("Error fetching agents:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, mobile, password })
    })
      .then((res) => res.json())
      .then(() => {
        setName("");
        setEmail("");
        setMobile("");
        setPassword("");
        fetchAgents(); 
      })
      .catch((err) => console.error("Error adding agent:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Agent</h1>

      {/* Existing Agents */}
      <h2>Existing Agents</h2>
      {agents.length > 0 ? (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id}>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
                <td>{agent.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No agents found.</p>
      )}

      {/* Add New Agent Form */}
      <h2>Add New Agent</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Add Agent</button>
      </form>
    </div>
  );
}

export default AddAgent;