// src/App.js
import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';

import 'react-responsive-modal/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { WebSocketProvider } from './api/websocke/Websocket.js';
import AppRoutes from './Routes.js';

const App = () => {
  return (
    <div style={{ overflowy: 'scroll' }}>
      <WebSocketProvider>
        <ToastContainer />
        <AppRoutes />
      </WebSocketProvider>
    </div>
  );
};

export default App;
