import './App.css';
import ScrollSelect from './components/ScrollSelect/ScrollSelect';
import ConnexionBackEnd from './pages/ConnexionBackend/ConnexionBackEnd';

function App() {
  const services = ['Mars', 'M&m`s', 'Twix', 'Lizard on a stick', 'My foot in your bottom'];
  return (
    <div className="App">
      <ScrollSelect services={services}/>
      <ConnexionBackEnd/>
    </div>
  );
}

export default App;
