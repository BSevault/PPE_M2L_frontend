import EditCompte from '../../components/EditCompte/EditCompte';


const Compte = ({ user }) => {

  return (
    <div className="compte">
      <EditCompte user={user} />
    </div>
  );
};

export default Compte;
