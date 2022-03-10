import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import RoutesM2L from './components/Routes/RoutesM2L';
import Footer from './components/Footer/Footer';

import './App.css';
import { useAuth } from './components/contexts/AuthContext';

function App() {
  const { user, setUser } = useAuth();
  
  useEffect(() => {
        
    // ()() permet de faire fonctionner une fonction async dans un useEffect
    (async () => {
      const response = await axios.get(`http://localhost:3001/users/login`,
        { withCredentials: true }
      );
      // console.log(response);

        if (response.data.success.logged_user.id) {
          setUser(response.data.success.logged_user);
        }
      })()
  }, [setUser]);

  console.log(user);

  return (
    <div className="App">
      <Router>
        <Navbar />            {/* passe le JSON User + setUser en props pour avoir les données dans toutes l'app */}
        <RoutesM2L />
        <Footer />
      </Router>

    </div>
  );
}

export default App;

