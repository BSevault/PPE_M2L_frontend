const Compte = ({ user }) => {
  const userLogged = user;
  // console.log(userLogged);
  let arrUser = [];

  for (const data in userLogged) {
      const element = userLogged[data];
      // console.log(data, element);

      arrUser.push(`${data} : ${element}`);
  }

  return (
    <div className="compte">
      {arrUser.map((data, index) => {
        return <p key={`compte ${index}`}>{data}</p>;
      })}
    </div>
  );
};

export default Compte;
