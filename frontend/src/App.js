import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap-5.0.2-dist/css/bootstrap.min.css'
import StructureViewer from './Components/StructureViewer';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to the demo to use the chgnet ML model to predict energy and forces on a molecule.</p>

        <StructureViewer></StructureViewer>
      </header>
    </div>
  );
}

export default App;
