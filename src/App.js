import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import TheHeader from './components/TheHeader/TheHeader';
import TheFooter from './components/TheFooter/TheFooter';
import TheRouter from './components/TheRouter/TheRouter';

const App = () => {
  return (
    <div className="App" >
      <TheHeader />
      <main>
        <Router>
          <TheRouter />
        </Router>
      </main>
      <TheFooter />
    </div>
  );
}

export default App;
