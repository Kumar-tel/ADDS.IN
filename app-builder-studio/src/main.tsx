import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "reactflow/dist/style.css";
import "@reactflow/node-resizer/dist/style.css";

// Optional libraries used in many React templates
import "react-day-picker/dist/style.css";
import "sonner/dist/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);