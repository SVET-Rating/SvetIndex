import Navbar from './components/Navbar'
import Investment from './pages/Invesment'
import React from 'react';

function App() {
  return (
    <div className="App" >
      <header>
        <Navbar/>
    </header>
    <main>
        <Investment />
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
    </div>
  );
}

export default App;

