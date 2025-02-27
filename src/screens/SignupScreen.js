import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';
import { LoginInput, LoginButton } from '../components/AuthComponents';
import styles from '../styles/AuthStyles';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <LoginInput placeholder="Email" icon={require('../../assets/icons/mail1.png')} value={email} onChangeText={setEmail} />
      <LoginInput placeholder="Password" icon={require('../../assets/icons/lock4.png')} secureTextEntry value={password} onChangeText={setPassword} />

      <LoginButton title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignupScreen;
