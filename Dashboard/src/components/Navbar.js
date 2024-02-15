import { Link } from "react-router-dom"
import './Navbar.css';
import logo from '../assets/logo.png';
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
          <img src={logo} id="logo" alt="Druppel" />
          <Link to="/Home" className="link">
            <h1 id="aquathermieTitel">
              Aquathermie Den Bosch
            </h1>
          </Link>
        </div>
        <div id="grafiek"style={{  }}>
          <Link to="/GraphData"  className="link">
            <h3>
              Grafiek Data
            </h3>
          </Link>
          <Link to="/LiveData"  className="link">
            <h3>
              Live Data
            </h3>
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/Manage" className="link">
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
              <div style={{  }}>
                <LogoutButton />
              </div>
              <Link to="/Profile" style={{  }} className="link">
                <h4 style={{marginTop:"-15px" }}>
                  <Profile />
                </h4>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar