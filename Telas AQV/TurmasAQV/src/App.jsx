import React from 'react';
import Menu from '../Menu/Menu';
import TurmasAQV from '../components/TurmasAQV';
import './style.css';

function App() {
  return (
    <div className="app-container">
      <Menu />
      <main className="main-content">
        <TurmasAQV />
      </main>
    </div>
  );
}

export default App;