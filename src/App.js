import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import RoutesM2L from './components/Routes/RoutesM2L';
import Footer from './components/Footer/Footer';

import './App.css';

function App() {

  const [user, setUser] = useState('');

  useEffect(() => {
    const idUser = localStorage.getItem("userId");

    (
      async () => {
        if (idUser) {
          const result = await axios.get(`http://localhost:3001/users/${idUser}`);
          const user = result.data.success[0];

          setUser(user);
        }
      }
    )()
  }, []);

  // console.log(user);

  return (
    <div className="App">
      <Router>
        <Navbar user={user} setUser={setUser} />
<<<<<<< HEAD
        <RoutesM2L user={user} setUser={setUser} />
=======
        <div className="content">
          <RoutesM2L user={user} setUser={setUser} />
        </div>
>>>>>>> 7810980a5ffafd06e7009d5eb59508ae24fa2f8d
        <Footer />
      </Router>

    </div>
  );
}

export default App;
