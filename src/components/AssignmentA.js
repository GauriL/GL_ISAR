import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SensorData = () => {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/SpectrumStatus');
      setSensorData(response.data);
      console.log('sensor data:', response);
    } catch (error) {
      console.error('Error fetching sensor data:', error);

      if (error.response) {
        setError(`Server error: ${error.response.status}`);
      } else if (error.request) {
        setError('No response received from the server');
      } else {
        setError('Error setting up the request');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefreshClick = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Assignment A:</h1>
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>}
      <div style={{ textAlign: 'center' }}>
        {sensorData && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={[
                { name: 'Velocity', value: sensorData.velocity },
                { name: 'Temperature', value: sensorData.temperature },
                { name: 'Altitude', value: sensorData.altitude },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
        <button
          onClick={handleRefreshClick}
          style={{ padding: '10px', fontSize: '1em', marginBottom: '20px' }}
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default SensorData;
