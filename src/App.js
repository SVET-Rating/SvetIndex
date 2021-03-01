import Navbar from './components/Navbar'
import Investment from './pages/Invesment'
import React from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
} from "react-router-dom";

import InvestmentPage from './pages/Invesment';
import DashboardPage from "./pages/dashboard";
import HomePage from "./pages/home";
import OraculesPage from "./pages/oracules";
import ExpertsPage from "./pages/experts";

function App() {
  return (
    <div className="App" >
      <HashRouter>
      <header>
        <Navbar/>
    </header>
    <main>
        <Switch>
        <Route exact path="/">
          <InvestmentPage /> 
        </Route>
        <Route path="/investments">
          <InvestmentPage />
        </Route>
        <Route path="/dashboards">
           <DashboardPage />
        </Route>
        <Route path="/oracules">
            <OraculesPage />
        </Route>
        <Route path="/experts">
            <ExpertsPage />
        </Route>
        </Switch>
        <footer>
            <div className="footer-info">
                <div className="footer-header">SVET Supply-Weighted Index (SVET-SWI)</div>
                <p className="footer-text">Svet SWI index is fully backed with tokens. When you purchase index, smart contract buys proportional amounts of token on Uniswap (with Uniswap pricing). You can sell index everytime and smart contract sells amounts of token on Uniswap. </p>
                <a href="http://svetrating.com/svet_index_supply/" className="footer-readmore" >READ MORE about SVWT-SWI</a>
            </div>
        </footer>
    </main>
    </HashRouter>
    </div>
  );
}

export default App;

