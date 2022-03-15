import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Cgv from "../../pages/Cgv/Cgv.js";
import Compte from "../../pages/Compte/Compte.js";
import Contact from "../../pages/Contact/Contact.js";
import Home from "../../pages/Home/Home.js";
import Legals from "../../pages/Legals/Legals.js";
import Login from "../../pages/Login/Login.js";
import Presentation from "../../pages/Presentation/Presentation.js";
import Produits from "../../pages/Produits/Produits.js";
import Reservations from "../../pages/Reservations/Reservations.js";
import Salles from "../../pages/Salles/Salles.js";
import SignIn from "../../pages/SignIn/SignIn.js";
import Complaint from "../../pages/Complaint/Complaint.js";
import { useAuth } from "../../components/contexts/AuthContext.js";
import SallesContextProvider from "../contexts/SallesContext.js";
import Reunions from "../../pages/Reunions/Reunions.js";

const ProtectedRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const RoutesM2L = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/compte" element={<Compte />} />
          <Route path="/reservations" element={<Reservations />} />
          {/* <Route path="/reunions" element={<Reunions />} /> */}
          <Route path="/complaint" element={<Complaint />} />
          
          <Route path="/produits" element={<Produits />} />
        </Route>

        <Route path="/salles" element={<SallesContextProvider><Salles /></SallesContextProvider>} />
      
      
        <Route path="/legals" element={<Legals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cgv" element={<Cgv />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/presentation" element={<Presentation />} />
      </Routes>
    
  );
};

export default RoutesM2L;
