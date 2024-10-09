import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactModal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
ReactModal.setAppElement('#root');

root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </BrowserRouter>,
);
