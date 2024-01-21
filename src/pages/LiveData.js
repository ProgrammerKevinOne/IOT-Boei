import { useEffect, useState } from 'react';

const LiveData = () => {
    const [temperature, setTemperature] = useState(null);
    const [tds, setTds] = useState(null);
    const [oxygen, setOxygen] = useState(null);
    const [ph, setPh] = useState(null);
    const [date, setDate] = useState(null);
    const [battery, setBattery] = useState(null);
  
    useEffect(() => {
      fetch('http://141.148.243.197:1880/get/sensordata')
        .then(response => response.json())
        .then(data => {
          // Sort the data array in ascending order by time
          data.sort((a, b) => new Date(a.data.time) - new Date(b.data.time));
        
          // Get the temperature, TDS, oxygen, pH values and time of the last data point
          const mostRecentTemperature = data[data.length - 1].data.temp;
          const mostRecentTds = data[data.length - 1].data.tds;
          const mostRecentOxygen = data[data.length - 1].data.oxygen;
          const mostRecentPh = data[data.length - 1].data.phWaarde;
          const mostRecentDate = data[data.length - 1].data.time;
          const mostRecentBattery = data[data.length - 1].data.battery;
          setTemperature(mostRecentTemperature);
          setTds(mostRecentTds);
          setOxygen(mostRecentOxygen);
          setPh(mostRecentPh);
          setDate(mostRecentDate);
          setBattery(mostRecentBattery);
        })
        .catch(error => console.error('Error:', error));
    }, []);
  
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h2 style={{ color: '#333' }}>Live data</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>
              <h3>Datum</h3>
              <p>{date}</p>
            </div>
            <div>
              <h3>Temperatuur</h3>
              <p>{temperature} °C</p>
            </div>
            <div>
              <h3>Totaal opgeloste vaste stoffen (TDS)</h3>
              <p>{tds} ppm</p>
            </div>
            <div>
              <h3>zuurstofgehalte</h3>
              <p>{oxygen} mg/L</p>
            </div>
            <div>
              <h3>Zuurtegraad</h3>
              <p>{ph} pH</p>
            </div>
          </div>
          {/* other data... */}
          <div style={{ fontSize: '50px', textAlign: 'left', marginTop: '20px' }}>
           🏊‍♂️ {temperature > 20 ? '❗' : '✅'}
          </div>
          <div style={{ fontSize: '20px', textAlign: 'left', marginTop: '20px' }}>
           {temperature > 20 ? 'Het water is warmer dan 20 °C dus er is kans op aanwezigheid van blauwalg in het water.' :
            'Het water is kouder dan 20 °C Er is weinig kans op aanwezigheid van blauwalg in het water.'}
          </div>
          <div style={{ fontSize: '50px', textAlign: 'left', marginTop: '20px' }}>
           🐠 {oxygen < 3 ? '❗' : '✅'}
          </div>
          <div style={{ fontSize: '20px', textAlign: 'left', marginTop: '20px' }}>
          {oxygen < 3 ? 'Het zuurstof niveau is lager dan 3 mg/L, vissen kunnen hier moeilijk in overleven.' :
           'Het zuurstof niveau is hoger dan 3 mg/L, vissen kunnen hier in overleven.'}
          </div>
          <div style={{ fontSize: '50px', textAlign: 'left', marginTop: '20px' }}>
           {battery < 20 ? '🔌' : '🔋'}{battery} %
          </div>
          <div style={{ fontSize: '20px', textAlign: 'left', marginTop: '20px' }}>
          {battery < 20 ? 'De batterij van de boei is bijna leeg.' :
           'De batterij van de boei is vol genoeg.'}
          </div>
        </div>
      );
  };
  
  export default LiveData;