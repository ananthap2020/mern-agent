import React, { useState, useEffect } from "react";

function AddAgent() {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
      body: JSON.stringify({ name, email, mobile, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMessage(`❌ ${data.error}`);
        } else {
          setMessage("✅ Agent added successfully!");
          setAgents((prevAgents) => [...prevAgents, data]);
          setName("");
          setEmail("");
          setMobile("");
          setPassword("");
        }
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((err) => {
        console.error("Error adding agent:", err);
        setMessage("❌ Failed to add agent.");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Add Agent</h1>

      {/* Add New Agent Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          style={{
            padding: "8px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
          }}
        >
          Add Agent
        </button>
      </form>

      {/* Success/Error Message */}
      {message && (
        <p style={{ marginBottom: "20px", fontWeight: "bold" }}>{message}</p>
      )}

      {/* Existing Agents */}
      <h2>Existing Agents</h2>
      {agents.length > 0 ? (
        <table
          border="1"
          cellPadding="8"
          style={{
            borderCollapse: "collapse",
            width: "80%",
            maxWidth: "600px",
            textAlign: "center",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
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
    </div>
  );
}

export default AddAgent;