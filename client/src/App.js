import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TripProvider } from "./context/TripContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import TripGroupPage from "./pages/TripGroupPage";
import GroupDetails from "./pages/GroupDetails";

function App() {
  return (
    <TripProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-trip" element={<TripGroupPage />} />
            <Route path="/group/:groupId" element={<GroupDetails />} />
          </Routes>
        </div>
      </Router>
    </TripProvider>
  );
}

export default App;
