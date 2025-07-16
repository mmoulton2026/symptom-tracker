import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import SymptomForm from './SymptomForm';
import LogHistory from './LogHistory';
import ExportButton from './ExportButton';

// API base URL
// Use environment variable or fallback to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? "https://func2jtunws2rvboc.azurewebsites.net/api" : "http://localhost:7071/api");

function Dashboard() {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (accounts.length > 0) {
      const account = accounts[0];
      const username = account.name || account.username || account.localAccountId;
      setUser(username);
      fetchLogs(username);
    }
  }, [accounts]);

  const handleLogout = () => {
    instance.logoutPopup()
      .then(() => {
        setUser(null);
        setLogs([]);
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };

  // Fetch logs from backend
  const fetchLogs = async (username) => {
    setLoading(true);
    try {
      // Try to fetch from API first
      const response = await fetch(`${API_BASE_URL}/getlogs?userId=${encodeURIComponent(username)}`);
      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs || []);
      } else {
        throw new Error('API call failed');
      }
    } catch (error) {
      console.log('Using demo data - backend not yet available');
      // Use demo data
      setLogs([
        {
          id: 'demo-1',
          date: new Date().toISOString().split('T')[0],
          time: '10:00',
          notes: `Welcome ${username}! This is demo data. Backend deployment in progress.`,
          userId: username,
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Add log to backend
  const handleAddLog = async (log) => {
    setLoading(true);
    try {
      const logData = {
        ...log,
        username: user
      };

      const response = await fetch(`${API_BASE_URL}/addlog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });

      if (response.ok) {
        // Refresh logs after adding
        await fetchLogs(user);
        alert('Symptom log added successfully!');
      } else {
        const errorData = await response.json();
        alert('Error adding log: ' + (errorData.error || response.statusText));
      }
    } catch (error) {
      console.error('Error adding log:', error);
      alert('Error adding log: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        borderBottom: '1px solid #eee',
        paddingBottom: '15px'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#333' }}>Welcome, {user}</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
            Track your symptoms and monitor your health journey
          </p>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
        >
          Sign Out
        </button>
      </div>
      
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          marginBottom: '20px'
        }}>
          <p>Loading...</p>
        </div>
      )}
      
      <div style={{ display: 'grid', gap: '20px' }}>
        <SymptomForm onAddLog={handleAddLog} disabled={loading} />
        <LogHistory logs={logs} />
        <ExportButton logs={logs} />
      </div>
    </div>
  );
}

export default Dashboard;
