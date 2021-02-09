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
          <HomePage />
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
                <div className="footer-header">about “BEST INDEX TOKEN”</div>
                <p className="footer-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                    non orci ac dui elementum blandit. Nulla facilisi. Aliquam suscipit suscipit placerat. Suspendisse
                    euismod
                    semper eros eget blandit. Cras erat risus, venenatis id commodo accumsan, condimentum sit amet
                    libero.
                    Suspendisse potenti. Cras sed purus mollis, luctus sem quis, tristique lectus. Aenean.</p>
                <button className="footer-readmore">READ MORE</button>
            </div>
        </footer>
    </main>
    </HashRouter>
    </div>
  );
}

export default App;

