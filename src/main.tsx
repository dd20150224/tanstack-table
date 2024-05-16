import React from 'react'
import ReactDOM, { Container } from 'react-dom/client'
import App from './App'
import './index.css'

const rootEl = document.getElementById('root');
ReactDOM.createRoot(rootEl as Container).render(
  <App />
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
)
