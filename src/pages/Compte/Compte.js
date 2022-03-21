import { useAuth } from '../../components/contexts/AuthContext';
import EditCompte from '../../components/EditCompte/EditCompte';
import EditPassword from '../../components/EditPassword/EditPassword';
import SuppCompte from '../../components/SuppCompte/SuppCompte';


const Compte = () => {
  const { user } = useAuth();

  return (
    <div className="compte">
      <EditCompte user={user} />
      <EditPassword user={user} />
      <SuppCompte/>
    </div>
  );
};

export default Compte;
