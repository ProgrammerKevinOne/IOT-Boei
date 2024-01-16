

import { BrowserRouter, Routes, Route } from 'react-router-dom';
//pages and components
import Home from './pages/Home';
import Data from './pages/Data';
import Navbar from './Components/Navbar';
import logo from './logo.svg';
import './App.css';
import Auth0ProviderWithHistory from './auth0Provider';

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/Home' element={<Home />} />
            <Route path='/data' element={<Data />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
