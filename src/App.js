import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import RoutesM2L from './components/Routes/RoutesM2L';
import Footer from './components/Footer/Footer';

import './App.css';
import useAxios from './hooks/useAxios/useAxios';
import { useAuth } from './components/contexts/AuthContext';

function App() {
const { user } = useAuth();
  // const [user, setUser] = useState('');

  
  
  // useEffect(() => {
  //   //   // const idUser = localStorage.getItem("userId");  // va lire l'idUser stocker en LocalStorage
    
  //   // ()() permet de faire fonctionner une fonction async dans un useEffect
  //   (async () => {
  //     const response = await axios.get(`http://localhost:3001/users/login`,
  //       { withCredentials: true }
  //     );
  //     console.log(response);

  //       if (response.data.success.logged_user.id) {

  //         // const result = await axios.get(`http://localhost:3001/users/${response.data.success.logged_user.id}`, { withCredentials: true }); // call axios avec l'id du User
  //         // const user = result.data.success[0];                                     // recupère toute les infos du user

  //         setUser(response.data.success.logged_user);
  //       }
  //     })()
  // }, []);

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

