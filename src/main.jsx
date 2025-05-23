import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import {Provider} from "react-redux"
import { store } from './redux/store.js';
import React from 'react';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <App />
  </Provider>
 
)
