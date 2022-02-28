// import GenericFormSimple from '../../components/GenericFormSimple';
import { useState } from 'react';
import GenericFormSimple from '../../components/GenericFormSimple/GenericFormSimple';
import useAxios from '../../hooks/useAxios/useAxios';

const Compte = ({ user }) => {

  const userFiltered = {...user};
  ['id', 'is_active', 'is_admin', 'ddn'].forEach(e => delete userFiltered[e]);


  const [toSend, setToSend] = useState(userFiltered);
  const [content, setContent] = useState(null);
  const method = 'put';
  const adress = `localhost:3001/users/${user.id}`;

  console.log(adress);
  console.log(user);

  const genericFormData = {
    "toSend": toSend,
    "setToSend": setToSend,
  }

  const updateAccount = useAxios;

  const handleSubmit = (e) => {
    // prevent page reloading
    e.preventDefault();
    Object.keys(toSend).forEach((key) => {
      user[key] = toSend[key];
    })
    // console.log(user);

    setContent({
      "nom": user.nom,
      "prenom": user.prenom,
      "email": user.email,
      "tel": user.tel,
      "password": "test",
      "ddn": user.ddn,
      "adresse": user.adresse
    });

    updateAccount(method, adress, content);

  }

  // useEffect(() => {
  //   if (response) setSalles(response.success);
  // }, [response])

  return (
    <div className="compte">
      <GenericFormSimple props={genericFormData} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Compte;
