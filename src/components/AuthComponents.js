import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/AuthStyles';
import Icon from 'react-native-vector-icons/FontAwesome';


// Reusable Input Component
export const LoginInput = ({ placeholder, iconName, secureTextEntry = false, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <Icon name={iconName} size={20} color="#999" style={styles.inputIcon} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

// Reusable Button Component
export const LoginButton = ({ title, onPress, icon, variant = "primary" }) => (
  <TouchableOpacity
    style={[styles.button, variant === "social" ? styles.socialButton : styles.primaryButton]}
    onPress={onPress}
  >
  <View style = {styles.buttonContent}>
    {icon && <Image source={icon} style={styles.buttonIcon} />}
    <Text style={[styles.buttonText, variant === "social" ? styles.socialButtonText : styles.primaryButtonText]}>
      {title}
    </Text>
  </View>
  </TouchableOpacity>
);

// Reusable Divider Component
export const LoginDivider = () => (
  <View style={styles.dividerContainer}>
    <View style={styles.dividerLine} />
    <Text style={styles.dividerText}>or Continue with</Text>
    <View style={styles.dividerLine} />
  </View>
);

// Reusable Signup Link Component
export const SignupLink = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.signupContainer}>
    <Text style={styles.signupText}>
      Don't have an account? <Text style={styles.signupLink}>Sign up</Text> here
    </Text>
  </TouchableOpacity>
);