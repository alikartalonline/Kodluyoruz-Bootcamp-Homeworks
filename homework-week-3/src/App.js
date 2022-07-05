import './App.css';
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './components/HomePage';


function App() {

  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
