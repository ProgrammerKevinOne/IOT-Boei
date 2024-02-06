import water from '../assets/water.jpg'; // Adjust the path as needed

const Home = () => {
  return (
    <>
      <div style={{ display: 'flex', width: "95%"}}>
        <div style={{marginRight: '50px'}}>
          <img src={water} alt="Water" style={{ width:'600px', height: 'auto'}} />
        </div>
        <div>
          <p style={{ height: 'auto' }}>
            's-Hertogenbosch heeft veel water dat door de stad heen stroomt.
            Maar heeft de stad zelf enig invloed op de kwaliteit van het water?
            Hiervoor zal een IOT-boei ontworpen worden die de verschillende eigenschappen zal meten.
          </p>
          <p style={{ height: 'auto' }}>
            Voor het project Aquathermie wordt er verwacht dat een IOT-boei wordt ontworpen en gerealiseerd om de watereigenschappen te meten.
            Op deze website zullen de data worden weergeven die de boei verzameld.
          </p>
          <p style={{ height: 'auto' }}>
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