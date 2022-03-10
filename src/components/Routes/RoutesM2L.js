import { Routes, Route } from "react-router-dom";
import Cgv from "../../pages/Cgv/Cgv.js";
import Compte from "../../pages/Compte/Compte.js";
import Contact from "../../pages/Contact/Contact.js";
import Home from "../../pages/Home/Home.js";
import Legals from "../../pages/Legals/Legals.js";
import Login from "../../pages/Login/Login.js";
import Logout from "../../pages/Logout/Logout.js";
import Presentation from "../../pages/Presentation/Presentation.js";
import Produits from "../../pages/Produits/Produits.js";
import Reservations from "../../pages/Reservations/Reservations.js";
import Salles from "../../pages/Salles/Salles.js";
import SignIn from "../../pages/SignIn/SignIn.js";
import Complaint from "../../pages/Complaint/Complaint.js";
import { useAuth } from "../contexts/AuthContext.js";

const RoutesM2L = () => {
  const { user, setUser } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home user={user}/>} />
      <Route path="/produits" element={<Produits/>} />
      <Route path="/login" element={<Login user={user} setUser={setUser} />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/compte" element={<Compte user={user} />} />
      <Route path="/legals" element={<Legals />} />
      <Route path="/salles" element={<Salles user={user} />} />
      <Route path="/cgv" element={<Cgv />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/presentation" element={<Presentation />} />
      <Route path="/complaint" element={<Complaint user={user} />} />
      <Route path="/reservations" element={<Reservations user={user}/>} />

      {/* <Route path="/backend" element={<ConnectDB />} /> */}
    </Routes>
  );
};

export default RoutesM2L;