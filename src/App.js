import './App.css';
import SensorData from './components/AssignmentA';
import LiveSensorData from './components/AssignmentB';
import PotentialImprovements from './components/AssignmentC'


function App() {
  return (
    <div className="App">    
    <SensorData />  
    <hr />
    <LiveSensorData />
    <hr />
    <br />
    <PotentialImprovements />
    <br />
    </div>
  
  );
}

export default App;
