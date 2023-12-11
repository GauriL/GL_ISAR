import React from 'react';
import '../index.css';

const PotentialImprovements = () => {
    return (
        <div className="api-info-container">
        <h1>Assignment C:</h1>
          <h3>API Structure:</h3>
            <ul>
                <li><strong>Versioning:</strong> Consider adding versioning to the API to ensure backward compatibility as the API evolves. This can be achieved by including a version number in the URL (e.g., /v1/SpectrumStatus).</li>
                <li><strong>Documentation:</strong> Provide comprehensive and up-to-date documentation for the API. Include information on request/response formats, error handling, and any potential changes or updates.
                <p>It would have been great if it was specified in the document which methods(e.g.,GET, POST) were allowed and were expected to use and also what was expected to happen when user decides to Act on Spectrum</p>
                </li>
            </ul>
            <h3>Deviations from Common Standards:</h3>
              <ul>
                <li><strong>WebSocket Protocol:</strong> The use of WebSocket for real-time data (SpectrumWS) is a good practice. WebSocket connections are secured using appropriate encryption (wss).</li>
                <li><strong>HTTP Status Codes:</strong> Ensure that the API returns appropriate HTTP status codes for different scenarios (e.g., 200 for success, 404 for not found, 500 for server errors).</li>
              </ul>
           
              <h3>Performance Enhancements:</h3>
              <ul>
                <li><strong>Pagination for Large Data Sets:</strong> If the sensor data set becomes large, consider implementing pagination in the API response to improve performance. This allows clients to retrieve data in smaller chunks.</li>
                <li><strong>Compression:</strong> Implement data compression (e.g., gzip) for API responses to reduce bandwidth usage, especially for frequent updates in the WebSocket scenario.</li>
                <li><strong>Load Balancing:</strong> Implement load balancing to distribute incoming API requests across multiple servers, ensuring optimal performance and availability.</li>
              </ul>
    
          <p>By addressing these considerations, one can enhance the overall robustness and usability of the API and the associated web interface.</p>
        </div>
      );
    };

export default PotentialImprovements;