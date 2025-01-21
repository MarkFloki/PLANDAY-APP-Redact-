import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Оголошення типів для вкладок
type TabParamList = {
  Home: undefined;
  Tasks: undefined;
  Calendar: undefined;
  VoiceInput: undefined; // Новий екран для голосового вводу
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

// Екран VoiceInput (новий)
type VoiceInputScreenProps = BottomTabScreenProps<TabParamList, "VoiceInput">;

function VoiceInputScreen({}: VoiceInputScreenProps) {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      setTranscript(spokenText);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Recognition error:", event.error);
      setListening(false);
    };

    const startListening = () => {
      recognition.start();
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Voice to Text</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your transcribed text will appear here"
            value={transcript}
            onChangeText={setTranscript}
          />
          <TouchableOpacity
            style={styles.micButton}
            onPress={startListening}
            disabled={listening}
          >
            <Ionicons
              name={listening ? "mic" : "mic-outline"}
              size={32}
              color={listening ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.hint}>Press the microphone icon to start voice input.</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Voice recognition is not supported on your device.</Text>
      </View>
    );
  }
}

// Навігація Tab Navigator
const Tab = createBottomTabNavigator<TabParamList>();

export default function IndexNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TaskScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="VoiceInput" component={VoiceInputScreen} /> {/* Новий екран */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 8,
  },
  micButton: {
    marginLeft: 10,
  },
  hint: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
