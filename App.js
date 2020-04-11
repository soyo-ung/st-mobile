import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomTabNav from "./navigation/BottomTabNav";

export default function App() {
  return <BottomTabNav />;
}

// export default function App() {
//   return (
//     <View>
//       <Text>왜?</Text>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
