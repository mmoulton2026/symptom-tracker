import React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';

function AuthWrapper() {
  return (
    <div>
      <AuthenticatedTemplate>
        <Dashboard />
      </AuthenticatedTemplate>
      
      <UnauthenticatedTemplate>
        <LoginPage />
      </UnauthenticatedTemplate>
    </div>
  );
}

export default AuthWrapper;
