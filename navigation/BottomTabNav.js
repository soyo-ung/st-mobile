import React from "react";
import { Text, View, Modal } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTab from "../components/HomeTab";
import MyTab from "../components/MyTab";
import AlarmTab from "../components/AlarmTab";
import TrendingTab from "../components/TrendingTab";
import LoginScreen from "../components/LoginScreen";
import PostScreen from "../components/PostScreen";
import { EvilIcons, AntDesign } from "@expo/vector-icons";

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home({ navigation }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          headerTitle: "Home",
          headerLeft: () => (
            <AntDesign
              name="login"
              size={20}
              style={{ paddingLeft: 20 }}
              onPress={() => navigation.navigate("Login")}
            />
          ),
          headerRight: () => (
            <AntDesign
              name="edit"
              size={20}
              style={{ paddingRight: 20 }}
              onPress={() => navigation.navigate("Posting")}
            />
          ),
        }}
      />
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="Posting" component={PostScreen} />
    </HomeStack.Navigator>
  );
}
function BottomTabNav({ navigation }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "navicon" : "navicon";
            } else if (route.name === "Trending") {
              iconName = focused ? "star" : "star";
            } else if (route.name === "Alarm") {
              iconName = focused ? "bell" : "bell";
            } else if (route.name === "My") {
              iconName = focused ? "user" : "user";
            }
            return <EvilIcons name={iconName} size={25} color={color} />;
          },
        })}
        tabBarOptions={{ activeTintColor: "#00BFFF" }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Trending" component={TrendingTab} />
        <Tab.Screen name="Alarm" component={AlarmTab} />
        <Tab.Screen name="My" component={MyTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomTabNav;
