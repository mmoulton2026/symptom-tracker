import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';

function Callback() {
  const { instance } = useMsal();

  useEffect(() => {
    instance.handleRedirectPromise()
      .then(response => {
        if (response) {
          console.log('Redirect login successful!', response);
          // Redirect to main app after successful login
          window.location.href = '/';
        }
      })
      .catch(error => {
        console.error('Redirect login failed:', error);
        // Redirect back to login on error
        window.location.href = '/';
      });
  }, [instance]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Processing login...</h2>
      <p>Please wait while we complete your authentication.</p>
      <div style={{
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #0078d4',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 2s linear infinite',
        marginTop: '20px'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Callback;
