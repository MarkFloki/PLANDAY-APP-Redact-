import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import Voice from "@react-native-voice/voice";
import axios from "axios";

export default function VoiceTask() {
  const [text, setText] = useState("");

  const startRecording = async () => {
    try {
      await Voice.start("ru-RU");
      Voice.onSpeechResults = (e) => {
        setText(e.value[0]);
      };
    } catch (error) {
      console.error(error);
    }
  };

  const sendToBackend = async () => {
    try {
      const response = await axios.post("http://localhost:8000/voice_to_text/", { audio: text });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending voice data:", error);
    }
  };

  return (
    <View>
      <Button title="Start Voice Input" onPress={startRecording} />
      <Text>{text}</Text>
      <Button title="Send" onPress={sendToBackend} />
    </View>
  );
}
