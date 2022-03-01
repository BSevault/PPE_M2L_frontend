import ScrollSelect from '../../components/ScrollSelect/ScrollSelect';
import ConnecBackEnd from '../ConnexionBackend/ConnecBackEnd';
import ItemList from '../../components/ItemList/ItemList';

const Home = () => {
    const services = ['Mars', 'M&m`s', 'Twix', 'Lizard on a stick', 'My foot in your bottom'];
    const productsKeys = ['nom_produit', 'description', 'qte_dispo', 'prix'];

  return (
    <div className="home">
      <ScrollSelect services={services} />
      <ConnecBackEnd />
      <ItemList name= 'products' method='get' adress='http://localhost:3001/produits' content={null} keys={productsKeys} />
    </div>
  );
};

export default Home;

