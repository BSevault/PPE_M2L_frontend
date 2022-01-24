import './App.css';
import ScrollSelect from './components/ScrollSelect/ScrollSelect';
import ConnecBackEnd from './pages/ConnexionBackend/ConnecBackEnd';

function App() {
  const services = ['Mars', 'M&m`s', 'Twix', 'Lizard on a stick', 'My foot in your bottom'];
  return (
    <div className="App">
      <ScrollSelect services={services}/>
      <ConnecBackEnd />
    </div>
  );
}

export default App;
