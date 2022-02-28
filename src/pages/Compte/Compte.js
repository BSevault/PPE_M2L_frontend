// import GenericFormSimple from '../../components/GenericFormSimple';
import { useState, useEffect } from 'react';
import GenericFormSimple from '../../components/GenericFormSimple/GenericFormSimple';
import useAxios from '../../hooks/useAxios/useAxios';

const Compte = ({ user }) => {

  // copy les données utilisateurs moins les données sensibles
  const userFiltered = {...user};
  ['id', 'is_active', 'is_admin', 'ddn'].forEach(e => delete userFiltered[e]);

  // définis les données qui vont transiter sur le back
  const [toSend, setToSend] = useState(userFiltered);
  const [content, setContent] = useState();
  const [adress, setAdress] = useState();
  
  // requête via custom hook, active uniquement à partir du moment ou "adress" est non null
  const { result, error, loading } = useAxios('put', adress, content);

  // Données du formulaire
  const genericFormData = {
    "toSend": toSend,
    "setToSend": setToSend,
  }

  // Quand le bouton "envoyez" est cliqué (sur genericForm)
  const handleSubmit = (e) => {
    // prevent page reloading
    e.preventDefault();

    // update l'objet utilisateur avec les données du formulaire
    Object.keys(toSend).forEach((key) => {
      user[key] = toSend[key];
    })

    // setup le body à envoyer
    setContent({
      "nom": user.nom,
      "prenom": user.prenom,
      "email": user.email,
      "tel": user.tel,
      "password": "test",
      "ddn": user.ddn.split('T')[0],
      "adresse": user.adresse
    });

    // setup l'adresse, déclenche le hook axios & la requête
    setAdress(`http://localhost:3001/users/${user.id}`);

  }

  return (
    <div className="compte">
      <GenericFormSimple props={genericFormData} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Compte;
