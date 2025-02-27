import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../config/FirebaseConfig';
import { LoginInput, LoginButton, LoginDivider, SignupLink } from '../components/AuthComponents';
import styles from '../styles/AuthStyles';

GoogleSignin.configure({
  webClientId: '720477462820-rtjjl9rebhbovl0bdsif1dq54crcu1a6.apps.googleusercontent.com',
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleGoogleLogin = async () => {
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
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <LoginInput placeholder="Email" icon={require('../../assets/icons/mail1.png')} value={email} onChangeText={setEmail} />
      <LoginInput placeholder="Password" icon={require('../../assets/icons/lock4.png')} secureTextEntry value={password} onChangeText={setPassword} />

      <LoginButton title="Login" onPress={handleLogin} />
      <LoginDivider />
      <LoginButton title="Continue with Google" icon={require('../../assets/icons/google.png')} onPress={handleGoogleLogin} variant="social" />

      <SignupLink onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

export default LoginScreen;
