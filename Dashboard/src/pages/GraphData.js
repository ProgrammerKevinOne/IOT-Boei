// Import necessary libraries
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, TimeSeriesScale } from 'chart.js';
import { format } from 'date-fns';
import 'chartjs-adapter-date-fns';
import "../components/GraphData.css";



Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, TimeSeriesScale);

const GraphData = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://aquathermie.tilaa.cloud:1880/get/sensordata');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data); // Log the response data

        const filteredData = data.filter(d => {
          const date = new Date(d.data.time);
          return date >= new Date(startDate) && date <= new Date(endDate);
        });

        setSensorData(filteredData);
      } catch (error) {
        console.error('Fetch error:', error); // Log any fetch errors
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);


  if (loading === true) {
    return <p>Loading.</p>;
  }


  if (error) {
    return <p>Error: Failed to fetch sensor data. Please try again later.</p>;
  }

  const tdsData = {
    labels: sensorData.map(d => format(new Date(d.data.time), 'dd MMM yyyy HH:mm')),
    datasets: [
      {
        label: 'TDS',
        data: sensorData.map(d => d.data.tds),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(128, 128, 128, 0.8)',
        pointRadius: 3, // Adjust point size
        pointBackgroundColor: 'dark-grey', // Adjust point color

      },
    ],
  };

  const temperatureData = {
    labels: sensorData.map(d => format(new Date(d.data.time), 'dd MMM yyyy HH:mm')),
    datasets: [
      {
        label: 'temperature',
        data: sensorData.map(d => d.data.temp),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(128, 128, 128, 0.8)',
        pointRadius: 3, // Adjust point size
        pointBackgroundColor: 'dark-grey', // Adjust point color

      },
    ],
  };

  const phData = {
    labels: sensorData.map(d => format(new Date(d.data.time), 'dd MMM yyyy HH:mm')),
    datasets: [
      {
        label: 'zuurtegraad',
        data: sensorData.map(d => d.data.phWaarde),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(128, 128, 128, 0.8)',
        pointRadius: 3, // Adjust point size
        pointBackgroundColor: 'dark-grey', // Adjust point color

      },
    ],
  };

  const oxygenData = {
    labels: sensorData.map(d => format(new Date(d.data.time), 'dd MMM yyyy HH:mm')),
    datasets: [
      {
        label: 'zuurstofgehalte',
        data: sensorData.map(d => d.data.oxygen),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(128, 128, 128, 0.8)',
        pointRadius: 3, // Adjust point size
        pointBackgroundColor: 'dark-grey', // Adjust point color

      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgba(255, 255, 255, 1)',
        bodyFontSize: 14,
      },
    },
    // other options...
  };

  return (
    <div>
      <div>
        <label>
          Start Datum: &nbsp;
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <label>
          &nbsp;Eind Datum: &nbsp;
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </label>
      </div>
      {<div id='Graph' >
        <div style={{ flexDirection: 'column', width: '80vw  ' }}>
          <div >
            <h3>TDS (ppm)</h3>
            <Line className='graphData' data={tdsData} options={options} />
          </div>
          <div>
            <h3>Zuurtegraad (pH)</h3>
            <Line data={phData} options={options} />
          </div>
        </div>
        <div style={{ flexDirection: 'column', width: '80vw' }}>
          <div>
            <h3>Temperatuur (°C)</h3>
            <Line data={temperatureData} options={options} className='graphData' />
          </div>
          <div>
            <h3>Zuurstofgehalte (mg/L)</h3>
            <Line data={oxygenData} options={options} className='graphData' />
          </div>
        </div>
      </div>}
    </div>

  );
};

export default GraphData;