// import GenericFormSimple from '../../components/GenericFormSimple';
import { useState } from 'react';
import GenericFormSimple from '../../components/GenericFormSimple/GenericFormSimple';

const Compte = ({ user }) => {

  const userFiltered = user;
  delete userFiltered['id', 'is_active', 'is_admin'];

  const [toSend, setToSend] = useState(user);

  const genericFormData = {
    "toSend": toSend,
    "setToSend": setToSend,
  }

  let arrUser = [];

  for (const data in user) {
    const element = user[data];
    arrUser.push(`${data} : ${element}`);
  }


  return (
    <div className="compte">
      <GenericFormSimple props={genericFormData} />
    </div>
  );
};

export default Compte;
