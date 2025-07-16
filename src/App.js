import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthWrapper from "./components/AuthWrapper";
import Callback from "./components/Callback";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route for authentication callback */}
        <Route path="/auth/callback" element={<Callback />} />
        
        {/* Main route - uses MSAL templates for auth state */}
        <Route path="/*" element={<AuthWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
