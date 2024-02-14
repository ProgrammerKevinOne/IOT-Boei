import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useAuth0 } from "@auth0/auth0-react";

const LiveData = () => {
  const { isAuthenticated } = useAuth0();
  const [temperature, setTemperature] = useState(null);
  const [tds, setTds] = useState(null);
  const [oxygen, setOxygen] = useState(null);
  const [ph, setPh] = useState(null);
  const [date, setDate] = useState(null);
  const [battery, setBattery] = useState(null);
  const [predictedTemperature, setPredictedTemperature] = useState(null);
  const [predictionDate, setPredictionDate] = useState(null);
  const [textTemp, setTextTemp] = useState(null);
  const [textOxygen, setTextOxygen] = useState(null);
  const [textBatt, setTextBatt] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTextTemp, setEditedTextTemp] = useState('');
  const [editedTextOxygen, setEditedTextOxygen] = useState('');
  const [editedTextBatt, setEditedTextBatt] = useState('');
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    console.log(editedTextBatt, editedTextOxygen, editedTextTemp);
    if (editedTextBatt !== '' && editedTextOxygen !== '' && editedTextTemp !== '') {
      fetch(`https://aquathermie.tilaa.cloud:1880/delete/sensorlimits/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ temperatuurLimit: textTemp }]),
      })
        .then(response => {
          if (response.ok) {
            console.log('Row deleted successfully');
          } else {
            console.error('Failed to delete row. Server returned:', response.status);
          }
        })
        .catch(error => console.error('Error:', error));


      fetch('https://aquathermie.tilaa.cloud:1880/post/sensorlimits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([[{ temperatuurLimit: editedTextTemp, OxygenLimit: editedTextOxygen, BatteryLimit: editedTextBatt }]]),
      })
        .then(response => response.json())
        .then(data => {
          console.log('POST Success:', data);
        })
        .catch(error => {
          console.error('POST Error:', error);
        });
      setTextOxygen(editedTextOxygen);
      setTextTemp(editedTextTemp);
      setTextBatt(editedTextBatt);
      setEditMode(false);
    } else {
      alert("Waardes niet ingevuld")
    }
  };

  useEffect(() => {
    fetch('https://aquathermie.tilaa.cloud:1880/get/sensordata')
      .then(response => response.json())
      .then(data => {
        // Sort the data array in ascending order by time
        data.sort((a, b) => new Date(a.data.time) - new Date(b.data.time));

        // Get the temperature, TDS, oxygen, pH values and time of the last data point
        const mostRecentTemperature = data[data.length - 1].data.temp;
        const mostRecentTds = data[data.length - 1].data.tds;
        const mostRecentOxygen = data[data.length - 1].data.oxygen;
        const mostRecentPh = data[data.length - 1].data.phWaarde;
        var mostRecentDate = data[data.length - 1].data.time;
        const mostRecentBattery = data[data.length - 1].data.battery;

        mostRecentDate = mostRecentDate.replace(/T/g, " ");
        mostRecentDate = format(new Date(mostRecentDate), 'dd MMM yyyy HH:mm')
        setTemperature(mostRecentTemperature);
        setTds(mostRecentTds);
        setOxygen(mostRecentOxygen);
        setPh(mostRecentPh);
        setDate(mostRecentDate);
        setBattery(mostRecentBattery);
      })
      .catch(error => console.error('Error:', error));

    // Fetch the predicted temperature
    fetch('https://aquathermie.tilaa.cloud:1880/get/voorspellingdata/')
      .then(response => response.json())
      .then(data => {
        const mostRecentPrediction = data[0];
        var num = mostRecentPrediction.data.voorspelde_temperatuur;
        setPredictedTemperature(num.toFixed(0));
        var pd = mostRecentPrediction.data.datum;
        pd = format(new Date(pd), 'dd MMM yyyy');
        setPredictionDate(pd); // Set the prediction date
      })
      .catch(error => console.error('Error:', error));

    fetch('https://aquathermie.tilaa.cloud:1880/get/sensorlimits/')
      .then(response => response.json())
      .then(data => {
        const mostRecentEntry = data[data.length - 1];
        if (mostRecentEntry) {
          setTextTemp(mostRecentEntry.temperatuurLimit);
          setTextOxygen(mostRecentEntry.OxygenLimit);
          setTextBatt(mostRecentEntry.BatteryLimit);
        }
      })
      .catch(error => console.error('Error:', error));

  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>Live data
        {isAuthenticated && (
          <>
            {!editMode && <button className="log" onClick={handleEditClick}>Bewerk</button>}
            {editMode && (
              <button className="log" onClick={handleSaveClick}>Opslaan</button>
            )}
          </>
        )}
      </h1>
      {editMode && (
        <>
          <div>
            <h3>Blauwalg temperatuur</h3>
            <input
              type="number"
              value={editedTextTemp}
              onChange={(e) => setEditedTextTemp(e.target.value)}
            />
          </div>
          <div>
            <h3>Zuurstofgehalte vissen</h3>
            <input
              type="number"
              value={editedTextOxygen}
              onChange={(e) => setEditedTextOxygen(e.target.value)}
            />
          </div>
          <div>
            <h3>Batterij leeg limiet</h3>
            <input
              type="number"
              value={editedTextBatt}
              onChange={(e) => setEditedTextBatt(e.target.value)}
            />
          </div>
        </>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          <h3>Datum</h3>
          <p>{date}</p>
        </div>
        <div>
          <h3>Water temperatuur</h3>
          <p>{temperature} °C</p>
        </div>
        <div>
          <h3>Totaal opgeloste vaste stoffen (TDS)</h3>
          <p>{tds} ppm</p>
        </div>
        <div>
          <h3>Zuurstofgehalte</h3>
          <p>{oxygen} mg/L</p>
        </div>
        <div>
          <h3>Zuurtegraad</h3>
          <p>{ph} pH</p>
        </div>
      </div>
      <div style={{ fontSize: '50px', textAlign: 'left', marginTop: '20px' }}>
        🏊‍♂️ {temperature > textTemp ? '❗' : '✅'}
      </div>
      <div style={{ fontSize: '20px', textAlign: 'left', marginTop: '20px' }}>
        {temperature > textTemp ? 'Het water is warmer dan ' + textTemp + ' °C dus er is kans op aanwezigheid van blauwalg in het water.' :
          'Het water is kouder dan ' + textTemp + ' °C Er is weinig kans op aanwezigheid van blauwalg in het water.'}
      </div>
      <div style={{ fontSize: '50px', textAlign: 'left', marginTop: '20px' }}>
        🐠 {oxygen < textOxygen ? '❗' : '✅'}
      </div>
      <div style={{ fontSize: '20px', textAlign: 'left', marginTop: '20px' }}>
        {oxygen < textOxygen ? 'Het zuurstof niveau is lager dan ' + textOxygen + ' mg/L, vissen kunnen hier moeilijk in overleven.' :
          'Het zuurstof niveau is hoger dan ' + textOxygen + ' mg/L, vissen kunnen hier in overleven.'}
      </div>
      <div style={{ fontSize: '50px', textAlign: 'left', marginTop: '20px' }}>
        {battery < textBatt ? '🔌' : '🔋'}{battery} %
      </div>
      <div style={{ fontSize: '20px', textAlign: 'left', marginTop: '20px' }}>
        {battery < textBatt ? 'De batterij van de boei is bijna leeg.' :
          'De batterij van de boei is vol genoeg.'}
      </div>
      <div>
        <h3>Voorspelde water temperatuur</h3>
        <p>Op {predictionDate} wordt het water ongeveer {predictedTemperature} °C</p>
      </div>
    </div>
  );
};

export default LiveData;