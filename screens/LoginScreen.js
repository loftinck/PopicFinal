import { useContext,useState } from 'react';
import { Alert } from 'react-native';


import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../dbfolder/logdb";

function LoginScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext);

    async function loginHandler({ email, password }) {
        setIsAuthenticating(true);
        try {
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
            auth.currentUser.getIdToken()
                .then((token) => {
                    authCtx.authenticate(token);
                });

        } catch (error) {
            Alert.alert(
                'Erreur !',
                'Vérifiez vos informations et réessayez'
            );
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Connexion en cours..." />;
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;