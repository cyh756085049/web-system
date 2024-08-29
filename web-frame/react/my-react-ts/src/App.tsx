import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./pages/emitter";
import About from "./pages/request";
import LayoutWrapper from "./pages/layout";

function App() {
  return (
      <Router>
          <LayoutWrapper />
      </Router>
  );
}

export default App;
