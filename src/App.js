import './App.css';
import ScrollSelect from './components/ScrollSelect/ScrollSelect';
// import ConnexionBackEnd from './pages/ConnexionBackend/ConnexionBackEnd';
import ConnexionBE2 from './pages/ConnexionBackend/ConnexionBE2';

function App() {
  const services = ['Mars', 'M&m`s', 'Twix', 'Lizard on a stick', 'My foot in your bottom'];
  return (
    <div className="App">
      <ScrollSelect services={services}/>
      <ConnexionBE2 />
    </div>
  );
}

export default App;
