import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AuthContext = React.createContext();

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
