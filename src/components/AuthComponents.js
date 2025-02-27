import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/AuthStyles';

export const LoginInput = ({ placeholder, icon, secureTextEntry = false, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <TextInput style={styles.input} placeholder={placeholder} secureTextEntry={secureTextEntry} value={value} onChangeText={onChangeText} />
    <Image source={icon} style={styles.inputIcon} />
  </View>
);

export const LoginButton = ({ title, onPress, icon, variant = "primary" }) => (
  <TouchableOpacity style={[styles.button, variant === "social" ? styles.socialButton : styles.primaryButton]} onPress={onPress}>
    {icon && <Image source={icon} style={styles.buttonIcon} />}
    <Text style={[styles.buttonText, variant === "social" ? styles.socialButtonText : styles.primaryButtonText]}>{title}</Text>
  </TouchableOpacity>
);

export const LoginDivider = () => (
  <View style={styles.dividerContainer}>
    <View style={styles.dividerLine} />
    <Text style={styles.dividerText}>or Continue with</Text>
    <View style={styles.dividerLine} />
  </View>
);

export const SignupLink = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.signupContainer}>
    <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupLink}>Sign up</Text> here</Text>
  </TouchableOpacity>
);
