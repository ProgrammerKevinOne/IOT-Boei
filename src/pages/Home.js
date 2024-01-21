import water from '../assets/water.jpg'; // Adjust the path as needed
import LoginButton from '../components/login';
import LogoutButton from '../components/logout';
import Profile from '../components/profile';
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Profile></Profile>
      {!isAuthenticated && (
        <>
          <LoginButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton />
        </>
      )}
      <div>
        <h2>
          Aquathermie Den Bosch
        </h2>

        <img src={water} alt="Water" style={{ width: '50%', height: 'auto' }} />
        <p style={{ width: '50%', height: 'auto' }}>
          's-Hertogenbosch heeft veel water dat door de stad heen stroomt.
          Maar heeft de stad zelf enig invloed op de kwaliteit van het water?
          Hiervoor zal een IOT-boei ontworpen worden die de verschillende eigenschappen zal meten.
        </p>
        <p style={{ width: '50%', height: 'auto' }}>
          Voor het project Aquathermie wordt er verwacht dat een IOT-boei wordt ontworpen en gerealiseerd om de watereigenschappen te meten.
          Op deze website zullen de data worden weergeven die de boei verzameld.
        </p>
        <p style={{ width: '50%', height: 'auto' }}>
          De website bestaat uit drie onderdelen.
          Het eerste tablad weergeeft de thuispagina.
        </p>
      </div>
    </>
  );
};

export default Home