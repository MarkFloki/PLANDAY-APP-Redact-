import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Button } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

// Оголошення типів для вкладок
type TabParamList = {
  Home: undefined;
  Tasks: undefined;
  Calendar: undefined;
};

// Екран Home
type HomeScreenProps = BottomTabScreenProps<TabParamList, "Home">;

function HomeScreen({ navigation }: HomeScreenProps) {
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

// Екран Tasks
type TaskScreenProps = BottomTabScreenProps<TabParamList, "Tasks">;

function TaskScreen({ navigation }: TaskScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Task Manager Screen</Text>
    </View>
  );
}

// Екран Calendar
type CalendarScreenProps = BottomTabScreenProps<TabParamList, "Calendar">;

function CalendarScreen({ navigation }: CalendarScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Calendar Screen</Text>
    </View>
  );
}

// Навігація Tab Navigator
const Tab = createBottomTabNavigator<TabParamList>();

export default function IndexNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TaskScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  );
}
