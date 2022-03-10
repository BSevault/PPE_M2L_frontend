import { useAuth } from '../../components/contexts/AuthContext';
import EditCompte from '../../components/EditCompte/EditCompte';
import EditPassword from '../../components/EditPassword/EditPassword';


const Compte = () => {
  const { user } = useAuth();

  return (
    <div className="compte">
      <EditCompte user={user} />
      <EditPassword user={user} />
    </div>
  );
};

export default Compte;
