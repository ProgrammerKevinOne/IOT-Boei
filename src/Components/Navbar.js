import { Link } from "react-router-dom"
import './Navbar.css';
import druppel from '../assets/druppel.png';
import LoginButton from '../components/login';
import LogoutButton from '../components/logout';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from '../components/profile';

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
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
          {isAuthenticated && (
            <>
              <Link to="/Manage" style={{ marginRight: '20px' }} className="link">
                <h3>
                  Beheer
                </h3>
              </Link>
            </>
          )}
          {!isAuthenticated && (
            <>
              <LoginButton />
            </>
          )}
          {isAuthenticated && (
            <>
              <div style={{ marginRight: '10px', marginTop: '15px' }}>
                <LogoutButton />
              </div>
              <div style={{ marginTop: '5px' }}>
              <Profile ></Profile>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar