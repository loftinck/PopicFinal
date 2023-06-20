import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredNom, setEnteredNom] = useState('');
  const [enteredPrenom, setEnteredPrenom] = useState('');
  const [enteredAge, setEnteredAge] = useState('');

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
    username: usernameIsInvalid,
    nom: nomIsInvalid,
    prenom : prenomIsInvalid,
    age: ageIsInvalid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
      case 'username':
        setEnteredUsername(enteredValue);
        break;
      case 'nom':
        setEnteredNom(enteredValue);
        break;
      case 'prenom':
        setEnteredPrenom(enteredValue);
        break;
      case 'age':
        setEnteredAge(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      username: enteredUsername,
      nom: enteredNom,
      prenom: enteredPrenom,
      age: enteredAge,
    });
  }

  return (
      <View style={styles.form}>
        <View>
          {!isLogin && (
              <Input
                  label="Nom"
                  onUpdateValue={updateInputValueHandler.bind(this, 'nom')}
                  value={enteredNom}
                  isInvalid={nomIsInvalid}
              />
          )}
          {!isLogin && (
              <Input
                  label="Prénom"
                  onUpdateValue={updateInputValueHandler.bind(this, 'prenom')}
                  value={enteredPrenom}
                  isInvalid={prenomIsInvalid}
              />
          )}
          {!isLogin && (
              <Input
                  label="Âge"
                  onUpdateValue={updateInputValueHandler.bind(this, 'age')}
                  value={enteredAge}
                  isInvalid={ageIsInvalid}
              />
          )}
          <Input
              label="Adresse Email"
              onUpdateValue={updateInputValueHandler.bind(this, 'email')}
              value={enteredEmail}
              keyboardType="email-address"
              isInvalid={emailIsInvalid}
          />
          {!isLogin && (
              <Input
                  label="Confirmez Adresse Email"
                  onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
                  value={enteredConfirmEmail}
                  keyboardType="email-address"
                  isInvalid={emailsDontMatch}
              />
          )}
          <Input
              label="Mot de passe"
              onUpdateValue={updateInputValueHandler.bind(this, 'password')}
              secure
              value={enteredPassword}
              isInvalid={passwordIsInvalid}
          />
          {!isLogin && (
              <Input
                  label="Confirmer Mot de passe"
                  onUpdateValue={updateInputValueHandler.bind(
                      this,
                      'confirmPassword'
                  )}
                  secure
                  value={enteredConfirmPassword}
                  isInvalid={passwordsDontMatch}
              />
          )}
          {!isLogin && (
              <Input
                  label="Pseudo"
                  onUpdateValue={updateInputValueHandler.bind(this, 'username')}
                  value={enteredUsername}
                  isInvalid={usernameIsInvalid}
              />
          )}

          <View style={styles.buttons}>
            <Button onPress={submitHandler}>
              {isLogin ? 'Connexion' : 'Continuer'}
            </Button>
          </View>
        </View>
      </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
