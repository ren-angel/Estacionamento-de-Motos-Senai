import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Rotas from './routes/index';

import './App.css';

function App() {
  return (
    <div>
      <Rotas />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
      />
    </div>
  );
}

export default App;
