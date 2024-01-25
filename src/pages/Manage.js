
import React, { useState, useEffect } from 'react';

const Manage = () => {
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const [data, setData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(formattedToday);

  useEffect(() => {
    fetch('https://141.148.243.197:1880/get/sensordata')
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(item => {
          const itemDate = new Date(item.data.time);
          return itemDate.toISOString().startsWith(selectedDay);
        });
        setData(filteredData);
      })
      .catch(error => console.error('Error:', error));
  }, [selectedDay]);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleDelete = (_id) => {
    fetch(`https://141.148.243.197:1880/delete/sensordata/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: _id }),
    })
    .then(() => {
      setData(data.filter(item => item._id !== _id));
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Beheer Sensor Data</h2>
      <input type="date" value={selectedDay} onChange={handleDayChange} />
        {/* Add more options for other days here */}
      
      {data && (
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>TDS</th>
              <th>Temperature</th>
              <th>pH Value</th>
              <th>Oxygen</th>
              <th>Battery</th>
              <th>Device</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.data.time}</td>
                <td>{item.data.tds}</td>
                <td>{item.data.temp}</td>
                <td>{item.data.phWaarde}</td>
                <td>{item.data.oxygen}</td>
                <td>{item.data.battery}</td>
                <td>{item.data.device}</td>
                <td><button onClick={() => handleDelete(item._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Manage;