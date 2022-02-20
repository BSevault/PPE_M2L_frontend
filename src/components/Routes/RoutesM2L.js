import { Routes, Route } from "react-router-dom";
import Compte from "../../pages/Compte/Compte.js";
import Home from "../../pages/Home/Home.js";
import Login from "../../pages/Login/Login.js";
import Logout from "../../pages/Logout/Logout.js";
import SignIn from "../../pages/SignIn/SignIn.js";

const RoutesM2L = ( { user, setUser } ) => {
  return (
    <Routes>
      <Route path="/" element={<Home user={user}/>} />
      <Route path="/login" element={<Login user={user} setUser={setUser} />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/compte" element={<Compte user={user} />} />

      {/* <Route path="/backend" element={<ConnectDB />} /> */}
    </Routes>
  );
};

export default RoutesM2L;