// import GenericFormSimple from '../../components/GenericFormSimple';
import { useState, useEffect } from 'react';
import GenericFormSimple from '../../components/GenericFormSimple/GenericFormSimple';
import useAxios from '../../hooks/useAxios/useAxios';

const Compte = ({ user }) => {

  const userFiltered = {...user};
  ['id', 'is_active', 'is_admin', 'ddn'].forEach(e => delete userFiltered[e]);


  const [toSend, setToSend] = useState(userFiltered);
  const [content, setContent] = useState();
  const [adress, setAdress] = useState();
  
  const { result, error, loading } = useAxios('put', adress, content);

  const genericFormData = {
    "toSend": toSend,
    "setToSend": setToSend,
  }

  const updateAccount = async () => {
    // try {
    //   await axios.put(adress, content)
    // } catch (error) {
    //   console.log(error.message);
    // }
    
  }

  const handleSubmit = (e) => {
    // prevent page reloading
    e.preventDefault();
    Object.keys(toSend).forEach((key) => {
      user[key] = toSend[key];
    })

    setContent({
      "nom": user.nom,
      "prenom": user.prenom,
      "email": user.email,
      "tel": user.tel,
      "password": "test",
      "ddn": user.ddn.split('T')[0],
      "adresse": user.adresse
    });

    setAdress(`http://localhost:3001/users/${user.id}`);


  }

  useEffect(() => {
    if (content) updateAccount();
  }, [content])

  return (
    <div className="compte">
      <GenericFormSimple props={genericFormData} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Compte;
