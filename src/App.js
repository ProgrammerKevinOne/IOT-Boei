

import { BrowserRouter, Routes, Route } from 'react-router-dom';
//pages and components
import Home from './pages/Home';
import Data from './pages/Data';
import Navbar from './Components/Navbar';

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
