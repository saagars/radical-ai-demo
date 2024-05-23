import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap-5.0.2-dist/css/bootstrap.min.css'
import StructureViewer from './Components/StructureViewer';

/**
 * We would want to use Typescript or typing extension for js - but for the purposes of a simple demo webapp
 * We just used simple javascript react
 * 
 * @returns Main react component for the webApp
 */
function App() {
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
