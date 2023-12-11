import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LiveSensorData = () => {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([
    { name: 'Velocity', value: 0 },
    { name: 'Temperature', value: 0 },
    { name: 'Altitude', value: 0 },
  ]);
  const chartInstanceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connectToWebSocket = () => {
    const socket = new WebSocket('wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS');

    const handleOpen = (event) => {
      console.log('WebSocket connection opened:', event);
      setLoading(false);
    };

    const handleMessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log('Received data from WebSocket:', newData);
      setSensorData(newData);
      updateChartData(newData);
    };

    const handleError = (event) => {
      console.error('WebSocket error:', event);
      setError('Error connecting to WebSocket');
      tryReconnect();
    };

    const handleClose = (event) => {
      console.log('WebSocket connection closed:', event);
      setError('WebSocket connection closed');
      tryReconnect();
    };

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('error', handleError);
    socket.addEventListener('close', handleClose);

    return () => {
      socket.close();
    };
  };

  const tryReconnect = () => {
    if (!reconnectTimeoutRef.current) {
      setError('Attempting to reconnect...');
      reconnectTimeoutRef.current = setTimeout(() => {
        connectToWebSocket();
        reconnectTimeoutRef.current = null;
      }, 3000); 
    }
  };

  useEffect(() => {
    connectToWebSocket();
  }, []);

  const updateChartData = (newData) => {
    setChartData([
      { name: 'Velocity', value: newData?.Velocity || 0 },
      { name: 'Temperature', value: newData?.Temperature || 0 },
      { name: 'Altitude', value: newData?.Altitude || 0 },
    ]);

    if (newData?.isActionRequired) {
      alert('Your attention is needed!');
      setTimeout(() => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.forceUpdate && chartInstanceRef.current.forceUpdate();
        }
      }, 3000);
    }
  };

  const handleActOnSpectrum = () => {
    if (!sensorData) {
      console.error('Sensor data is not available.');
      return;
    }
  
    const dataToSend = {
      Velocity: sensorData.Velocity || 0,
      Altitude: sensorData.Altitude || 0,
      Temperature: sensorData.Temperature || 0,
      StatusMessage: sensorData.StatusMessage || '',
      IsAscending: sensorData.IsAscending || false,
      isActionRequired: sensorData.isActionRequired || true,
    };
  
    const queryString = Object.entries(dataToSend)
      .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
      .join('&');
  
      window.alert(`Critical Response has been Submitted!\n\nData Parameters:\n${queryString}`);

    fetch(`https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text(); 
    })
    .then(data => {
      const jsonData = data ? JSON.parse(data) : null;
      console.log('ActOnSpectrum response:', jsonData);
    })
    .catch(error => {
      console.error('Error acting on Spectrum:', error);
    });
    console.log('Query String:', queryString);
  };

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.forceUpdate && chartInstanceRef.current.forceUpdate();
    }
  }, [chartData]);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Assignment B:</h1>
      {loading && <p style={{ textAlign: 'center' }}>Connecting to WebSocket...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>}
      <div style={{ textAlign: 'center' }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} ref={chartInstanceRef}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        {sensorData && sensorData.IsActionRequired && (
          <div style={{ marginTop: '20px', color: 'red' }}>
            <h2>This needs your attention!</h2>
            <button onClick={handleActOnSpectrum} style={{ padding: '10px', fontSize: '1em', marginBottom: '20px' }}>Act on Spectrum</button>
          </div>
        )}
        {sensorData && (
          <div style={{ marginTop: '20px' }}>
            <h4>Additional Information:</h4>
            <p>Is Action Required: {String(sensorData.IsActionRequired)}</p>
            <p>Is Ascending: {String(sensorData.IsAscending)}</p>
            <p>Status Message: {sensorData.StatusMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSensorData;
