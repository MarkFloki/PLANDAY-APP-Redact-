import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen"; // Ensure this is correctly defined
import TaskScreen from "./TaskScreen"; // Ensure this is correctly defined
import CalendarScreen from "./CalendarScreen"; // Ensure this is correctly defined
import RegisterScreen from "./RegisterScreen"; // Import RegisterScreen
import { Ionicons } from "@expo/vector-icons";

// Define tab types
type TabParamList = {
  Home: undefined;
  Tasks: undefined;
  Calendar: undefined;
  Register: undefined;
};

// Home Screen
type HomeScreenProps = BottomTabScreenProps<TabParamList, "Home">;

function HomeScreenComponent({ navigation }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Home Screen!</Text>
      <Button
        title="Go to Tasks"
        onPress={() => navigation.navigate("Tasks")}
      />
    </View>
  );
}

// Tasks Screen
type TaskScreenProps = BottomTabScreenProps<TabParamList, "Tasks">;

function TaskScreenComponent({ navigation }: TaskScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Task Manager Screen</Text>
    </View>
  );
}

// Calendar Screen
type CalendarScreenProps = BottomTabScreenProps<TabParamList, "Calendar">;

function CalendarScreenComponent({ navigation }: CalendarScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Calendar Screen</Text>
    </View>
  );
}

// Register Screen
type RegisterScreenProps = BottomTabScreenProps<TabParamList, "Register">;

function RegisterScreenComponent({ navigation }: RegisterScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Register Screen</Text>
    </View>
  );
}

// Tab Navigator
const Tab = createBottomTabNavigator<TabParamList>();

export default function IndexNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Tasks") {
              iconName = "list";
            } else if (route.name === "Calendar") {
              iconName = "calendar";
            } else if (route.name === "Register") {
              iconName = "person-add";
            } else {
              iconName = "help-circle";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreenComponent} />
        <Tab.Screen name="Tasks" component={TaskScreenComponent} />
        <Tab.Screen name="Calendar" component={CalendarScreenComponent} />
        <Tab.Screen name="Register" component={RegisterScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
