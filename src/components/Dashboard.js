import React, { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import SymptomForm from './SymptomForm';
import LogHistory from './LogHistory';
import ExportButton from './ExportButton';

// API base URL
// Use environment variable or fallback to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? "https://func2jtunws2rvboc.azurewebsites.net/api" : "http://localhost:7071/api");

console.log('Dashboard loaded with:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('Final API_BASE_URL:', API_BASE_URL);

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
      console.log('Fetching logs for user:', username);
      console.log('API URL:', `${API_BASE_URL}/getlogs`);
      
      // Try to fetch from API first
      const response = await fetch(`${API_BASE_URL}/getlogs?userId=${encodeURIComponent(username)}`);
      
      console.log('Fetch response status:', response.status);
      console.log('Fetch response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        setLogs(data.logs || []);
      } else {
        console.error('API call failed with status:', response.status);
        throw new Error('API call failed');
      }
    } catch (error) {
      console.log('Using demo data - backend not available:', error);
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

      console.log('Attempting to add log:', logData);
      console.log('API URL:', `${API_BASE_URL}/addlog`);

      const response = await fetch(`${API_BASE_URL}/addlog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Success response:', responseData);
        // Refresh logs after adding
        await fetchLogs(user);
        alert('Symptom log added successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
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
