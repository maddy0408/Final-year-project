import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 100,
    paddingBottom: 160,
    backgroundColor: "#FFFFFF",
  },
  header: {
    fontSize: 25,
    fontWeight: "300",
    color: "#010101",
    textAlign: "center",
    marginBottom: 60,
    fontFamily: "Inter",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: "400",
    color: "#010101",
    fontFamily: "Inter",
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginLeft: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 17,
  },
  primaryButton: {
    backgroundColor: "#86EAD0",
    paddingHorizontal: 70,
  },
  socialButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#86EACF",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Inter",
  },
  primaryButtonText: {
    color: "#FFFFFF",
  },
  socialButtonText: {
    color: "#010101",
    paddingRight: 20,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 37,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 46,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(141, 129, 129, 1)",
  },
  dividerText: {
    marginHorizontal: 8,
    color: "#010101",
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "500",
  },
  signupContainer: {
    marginTop: 33,
  },
  signupText: {
    fontSize: 16,
    textAlign: "center",
    color: "#010101",
    fontFamily: "Inter",
  },
  signupLink: {
    color: "rgba(134,234,207,1)",
  },
});

export default styles;
