import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthContextProvider } from "./Authcontext/authContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </AuthContextProvider>
);
