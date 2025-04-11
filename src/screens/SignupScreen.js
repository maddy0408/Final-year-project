import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/FirebaseConfig';
import { LoginInput, LoginButton } from '../components/AuthComponents';
import styles from '../styles/AuthStyles';

const SignupScreen = ({ navigation }) => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // State for validation errors
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    dob: '',
    phoneNumber: '',
  });

  // Validation functions
  const validateFullName = (name) => {
    const regex = /^[a-zA-Z\s]{2,50}$/;
    return regex.test(name);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return regex.test(password);
  };

  const validateDOB = (dob) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(dob)) return false;

    const [month, day, year] = dob.split('/');
    const date = new Date(`${year}-${month}-${day}`);
    const age = new Date().getFullYear() - date.getFullYear();

    return age >= 13; // Ensure user is at least 13 years old
  };

  const validatePhoneNumber = (phone) => {
    const regex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return regex.test(phone);
  };

  // Handle input changes and validate in real-time
  const handleInputChange = (field, value) => {
    switch (field) {
      case 'fullName':
        setFullName(value);
        setErrors((prev) => ({
          ...prev,
          fullName: validateFullName(value) ? '' : 'Invalid full name (2-50 characters, letters only).',
        }));
        break;
      case 'email':
        setEmail(value);
        setErrors((prev) => ({
          ...prev,
          email: validateEmail(value) ? '' : 'Invalid email address.',
        }));
        break;
      case 'password':
        setPassword(value);
        setErrors((prev) => ({
          ...prev,
          password: validatePassword(value)
            ? ''
            : 'Password must be at least 6 characters long, with at least one uppercase letter, one lowercase letter, and one number.',
        }));
        break;
      case 'dob':
        setDob(value);
        setErrors((prev) => ({
          ...prev,
          dob: validateDOB(value) ? '' : 'Invalid date of birth (MM/DD/YYYY) or age must be at least 13.',
        }));
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        setErrors((prev) => ({
          ...prev,
          phoneNumber: validatePhoneNumber(value) ? '' : 'Invalid phone number.',
        }));
        break;
      default:
        break;
    }
  };

  // Handle signup
  const handleSignUp = async () => {
    try {
      // Check if all fields are filled
      if (!fullName || !email || !password || !dob || !phoneNumber) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
      }

      // Check if there are any validation errors
      if (Object.values(errors).some((error) => error !== '')) {
        Alert.alert('Error', 'Please fix the errors in the form.');
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user data in Firestore (optional)
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        dob,
        phoneNumber,
      });

      // Success message
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Dashboard', { userId: user.uid });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      {/* Full Name Field */}
      <LoginInput
        placeholder="Full Name"
        iconName="user"
        value={fullName}
        onChangeText={(text) => handleInputChange('fullName', text)}
      />
      {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}

      {/* Email Field */}
      <LoginInput
        placeholder="Email"
        iconName="envelope"
        value={email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      {/* Password Field */}
      <LoginInput
        placeholder="Password"
        iconName="lock"
        secureTextEntry
        value={password}
        onChangeText={(text) => handleInputChange('password', text)}
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      {/* Date of Birth Field */}
      <LoginInput
        placeholder="Date of Birth (MM/DD/YYYY)"
        iconName="calendar"
        value={dob}
        onChangeText={(text) => handleInputChange('dob', text)}
      />
      {errors.dob ? <Text style={styles.errorText}>{errors.dob}</Text> : null}

      {/* Phone Number Field */}
      <LoginInput
        placeholder="Phone Number"
        iconName="phone"
        value={phoneNumber}
        onChangeText={(text) => handleInputChange('phoneNumber', text)}
        keyboardType="phone-pad"
      />
      {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}

      {/* Sign Up Button */}
      <LoginButton title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignupScreen;