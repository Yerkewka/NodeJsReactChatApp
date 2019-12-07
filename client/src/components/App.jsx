import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Custom components
import Join from './Join/Join';
import Chat from './Chat/Chat';

// Styles
import './App.css';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Join} />
      <Route exact path="/chat" component={Chat} />
    </Router>
  );
};

export default App;
