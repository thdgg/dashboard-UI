import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
    </BrowserRouter>
    
    
  </React.StrictMode>
);