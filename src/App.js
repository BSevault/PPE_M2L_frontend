// a modifier pour local <==> aws : AuthContext endpoint variable

import Navbar from './components/Navbar/Navbar';
import RoutesM2L from './components/Routes/RoutesM2L';
import Footer from './components/Footer/Footer';

import './App.css';
import { useAuth } from './components/contexts/AuthContext';


function App() {
  const { user } = useAuth();
  
    // console.log(user);

  return (
    <div className="App">
        <Navbar />            
        <RoutesM2L />
        <Footer />
    </div>
  );
}

export default App;

