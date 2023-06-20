import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {useNavigation} from '@react-navigation/native'

import FlatButton from '../ui/FlatButton.js';
import AuthForm from './AuthForm.js';
import {auth} from '../../dbfolder/logdb';

import {collection, getDocs} from "firebase/firestore";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {ScrollView} from "react-native-gesture-handler";


function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
    username: false,
    nom: false,
    prenom: false,
    age: false,
  });

  function switchAuthModeHandler() {
    if (isLogin){
      navigation.navigate('Signup');
    }else{
      navigation.navigate('Login');
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword, username, nom, prenom, age } = credentials;

    email = email.trim();
    password = password.trim();
    username = username.trim();
    nom = nom.trim();
    prenom = prenom.trim();
    age = age.trim();


    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
        !emailIsValid ||
        !passwordIsValid ||
        (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Erreur !', 'Vérifiez vos informations et réessayez');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    // createUserWithEmailAndPassword(auth, "loick.defretin@2024.icam.fr", "Icam31300")
    onAuthenticate({ email, password, username, nom, prenom, age });
  }

  return (
      <ScrollView>
      <View style={styles.authContent}>
        <AuthForm
            isLogin={isLogin}
            onSubmit={submitHandler}
            credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? 'Créer un compte' : 'Connectez-vous'}
          </FlatButton>
        </View>
      </View>
      </ScrollView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ADE2AF',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
