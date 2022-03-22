import { useEffect } from "react";

const useCheckSignIn = ( email, pwd, pwdVerif ) => {

    useEffect(() => {

        // REGEX pour email
        let patternEmail = new RegExp(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
    
        // on stylise l'input pour que user sait que sont email est pas correct.
        if (patternEmail.test(email.current.value)) {
          email.current.style.borderBottom = "solid 2px #43aa8b";
          email.current.emailIsOk = true;
        } else {
          email.current.style.borderBottom = "solid 2px red";
          email.current.emailIsOk = false;
        }
    
        // REGEX pour pwd
        const patternPwd = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})"
        );
    
        if (patternPwd.test(pwd.current.value)) {
          pwd.current.style.borderBottom = "solid 2px #43aa8b";
          pwd.current.pwdIsOk = true;
        } else {
          pwd.current.style.borderBottom = "solid 2px red";
          pwd.current.pwdIsOk = false;
        }
    
        if (
          pwd.current.value === pwdVerif.current.value &&
          pwdVerif.current.value !== ""
        ) {
          pwdVerif.current.style.borderBottom = "solid 2px #43aa8b";
          pwdVerif.current.pwdVerifIsOk = true;
        } else {
          pwdVerif.current.style.borderBottom = "solid 2px red";
          pwdVerif.current.pwdVerifIsOk = false;
        }
      });

}
 
export default useCheckSignIn;