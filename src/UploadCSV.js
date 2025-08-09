import React, { useState } from 'react';
import api from './services/api';

export default function UploadCSV() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!file) {
      setMessage('Please choose a file first.');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 60000
      });

      setMessage(res.data?.message || 'Upload successful');
    } catch (err) {
      console.error('Upload error:', err?.response?.data || err.message);
      if (err?.response?.data?.message) {
        setMessage('Upload failed: ' + err.response.data.message);
      } else if (err?.response?.status) {
        setMessage(`Upload failed: server responded ${err.response.status}`);
      } else {
        setMessage('Upload failed: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  };

  const buttonStyle = {
    backgroundColor: '#2196F3', 
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Upload CSV</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {message && (
        <div style={{
          marginTop: 12,
          color: message.startsWith('Upload successful') ? 'green' : 'red'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}