import './App.css';
import ScrollSelect from './components/ScrollSelect/ScrollSelect';

function App() {
  const services = ['Mars', 'M&m`s', 'Twix', 'Lizard on a stick', 'My foot in your bottom'];
  return (
    <div className="App">
      <ScrollSelect services={services}/>
    </div>
  );
}

export default App;
