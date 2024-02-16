import water from '../assets/water.jpg';
import '../components/Home.css';

const Home = () => {
  return (
    <>

<div id='HomeText' >
        <div style={{marginRight: '50px'}}>
          <img id='img' src={water} alt="Water"  />
        </div>
        <div>
          <p style={{ height: 'auto' }}>
            's-Hertogenbosch heeft veel water dat door de stad heen stroomt.
            Maar heeft de stad zelf enig invloed op de kwaliteit van het water?
            Hiervoor zal een IOT-boei ontworpen worden die de verschillende eigenschappen zal meten.
            <br/><br/>

            Voor het project Aquathermie wordt er verwacht dat een IOT-boei wordt ontworpen en gerealiseerd om de watereigenschappen te meten.
            Op deze website zullen de data worden weergeven die de boei verzameld.
            <br/><br/>

            De website bestaat uit twee onderdelen.
            Het eerste tablad weergeeft de grafiek data van de boei.
            Het tweede tablad weergeeft de live data van de boei.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;