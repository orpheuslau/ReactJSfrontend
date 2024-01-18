import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("surveyElement"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);