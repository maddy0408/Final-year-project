// src/screens/GoogleSignIn.js
import React from 'react';
import { View, Button, Alert } from 'react-native';
import { auth, GoogleSignin } from '../config/FirebaseConfig';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

const GoogleSignIn = ({ navigation }) => {
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      Alert.alert('Success', 'Google Sign-in successful!');
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <Button title="Google Sign In" onPress={googleSignIn} />
    </View>
  );
};

export default GoogleSignIn;
