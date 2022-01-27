import './App.css';
import Navbar from './components/Navbar/Navbar';
import ScrollSelect from './components/ScrollSelect/ScrollSelect';
import ConnecBackEnd from './pages/ConnexionBackend/ConnecBackEnd';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const services = ['Mars', 'M&m`s', 'Twix', 'Lizard on a stick', 'My foot in your bottom'];
  return (
    <div className="App">
      <Router>
        <Navbar />
      </Router>
      <ScrollSelect services={services} />
      <ConnecBackEnd />
    </div>
  );
}

export default App;
