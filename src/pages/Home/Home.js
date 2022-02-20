import ScrollSelect from '../../components/ScrollSelect/ScrollSelect';
import ConnecBackEnd from '../ConnexionBackend/ConnecBackEnd';

const Home = () => {
    const services = ['Mars', 'M&m`s', 'Twix', 'Lizard on a stick', 'My foot in your bottom'];

  return (
    <div className="home">
      <ScrollSelect services={services} />
      <ConnecBackEnd />
    </div>
  );
};

export default Home;

