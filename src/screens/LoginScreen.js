import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../config/FirebaseConfig';
import { LoginInput, LoginButton, LoginDivider, SignupLink } from '../components/AuthComponents';
import styles from '../styles/AuthStyles';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '706055356191-di670nf9fuvu40f507v1lc12b51pedpm.apps.googleusercontent.com',
});

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Dashboard', { userId: user.uid }); // Pass userId to Dashboard
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Check if Google Play Services is available
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Sign in with Google
      const { idToken } = await GoogleSignin.signIn();
      const credential = GoogleAuthProvider.credential(idToken);

      // Sign in to Firebase with Google credentials
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      Alert.alert('Success', 'Google Sign-in successful!');
      navigation.navigate('Dashboard', { userId: user.uid }); // Pass userId to Dashboard
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      {/* Email Input */}
      <LoginInput
        placeholder="Email"
        iconName="envelope"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <LoginInput
        placeholder="Password"
        iconName="lock"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <LoginButton title="Login" onPress={handleLogin} />

      {/* Divider */}
      <LoginDivider />

      {/* Google Sign-In Button */}
      <LoginButton
        title="Continue with Google"
        icon={require('../../assets/icons/google.png')}
        onPress={handleGoogleLogin}
        variant="social"
      />

      {/* Signup Link */}
      <SignupLink onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

export default LoginScreen;