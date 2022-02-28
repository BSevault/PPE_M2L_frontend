const useCheckPsw = ( psw, verifpsw, setValid ) => {

    const patternPwd = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );

    setValid(patternPwd.test(psw) && (psw === verifpsw));
    if (psw === verifpsw) console.log("ça marche normalement");

}
 
export default useCheckPsw;