const Compte = ({ user }) => {
  const userLogged = user;
  // console.log(userLogged);
  let arrUser = [];

  for (const data in userLogged) {
    if (userLogged.hasOwnProperty.call(userLogged, data)) {
      const element = userLogged[data];
      // console.log(data, element);

      arrUser.push(`${data} : ${element}`);
    }
  }

  return (
    <div className="compte">
      {arrUser.map((data) => {
        return <p>{data}</p>;
      })}
    </div>
  );
};

export default Compte;
