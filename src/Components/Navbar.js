import { Link } from "react-router-dom"
import './Navbar.css';
import druppel from '../assets/druppel.png';

const Navbar = () => {
    return (
      <header>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '50%', display: 'flex', alignItems: 'center' }}>
            <img src={druppel} alt="Druppel" style={{ marginRight: '10px', width: '100px', height: '100px' }} />
            <Link to="/Home" className="link">
              <h1>
                Aquathermie
              </h1>
            </Link>
          </div>
          <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/GraphData" style={{ marginRight: '20px' }} className="link">
              <h3>
                Grafiek Data
              </h3>
            </Link>
            <Link to="/LiveData" style={{ marginRight: '20px' }} className="link">
              <h3>
                Live Data
              </h3>
            </Link>
            <Link to="/Manage" style={{ marginRight: '20px' }} className="link">
              <h3>
                Manage
              </h3>
            </Link>
          </div>
        </div>
      </header>
    )
  }

export default Navbar