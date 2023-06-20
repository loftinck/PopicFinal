import { useState,useContext } from 'react';
import { Alert } from 'react-native';


import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../dbfolder/logdb";
import {SignUpdb,SignUpdb2} from "../dbfolder/functiondb";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password, username, nom,prenom,age }) {
    setIsAuthenticating(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      await SignUpdb(db, email,username, auth.currentUser.uid, nom,prenom,age);
      await  SignUpdb2(db,auth.currentUser.uid,username);
      auth.currentUser.getIdToken()
          .then((token) => {
            authCtx.authenticate(token);
          });

    } catch (error) {
      Alert.alert(
          "Erreur d'authentification",
          'Vérifiez vos informations et réessayez'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Création d'un compte..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;