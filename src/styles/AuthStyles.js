import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 32,
    textAlign: 'center',
    fontFamily: 'Zain-Italic'
    },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#000',
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  socialButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Zain-Italic',
  },
  primaryButtonText: {
    color: '#FFF',
  },
  socialButtonText: {
    color: '#000',
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#999',
  },
  signupContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#000',
  },
  signupLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  errorText: {
  color: 'red',
  fontSize: 12,
  marginBottom: 10,
},
});
