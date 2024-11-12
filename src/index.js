import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import global styles
import App from "./App"; // Import the App component
import reportWebVitals from "./reportWebVitals"; // For performance monitoring

import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { ContextProvider } from "./Context"; // Import the context provider

// Create the root element for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app with Router and Context provider wrapping the App
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
