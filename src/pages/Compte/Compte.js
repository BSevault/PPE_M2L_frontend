import EditCompte from '../../components/EditCompte/EditCompte';
import EditPassword from '../../components/EditPassword/EditPassword';


const Compte = ({ user }) => {

  return (
    <div className="compte">
      <EditCompte user={user} />
      <EditPassword user={user} />
    </div>
  );
};

export default Compte;
