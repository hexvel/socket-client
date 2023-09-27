import React from 'react'
import { BrowserRouter as Rouer } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Rouer>
    <App />
  </Rouer>,
)
