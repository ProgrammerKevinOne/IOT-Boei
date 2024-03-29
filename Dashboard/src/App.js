

import { BrowserRouter, Routes, Route } from 'react-router-dom';
//pages and components
import Home from './pages/Home';
import GraphData from './pages/GraphData';
import LiveData from './pages/LiveData';
import Navbar from './components/Navbar';
import Manage from './pages/Manage';
import Profile from './pages/Profile';
import { AuthenticationGuard } from "./components/authentication-guard";


function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/LiveData' element={<LiveData />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/GraphData' element={<GraphData />} />
            <Route path='/Profile' element={<AuthenticationGuard component={Profile} />} />
            <Route path='/Manage' element={<AuthenticationGuard component={Manage} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
