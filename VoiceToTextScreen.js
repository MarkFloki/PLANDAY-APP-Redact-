import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function VoiceToTextScreen() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();

  recognition.lang = 'en-US';

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onresult = (event) => {
    const transcriptText = event.results[0][0].transcript;
    setTranscript(transcriptText);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  const startListening = () => {
    recognition.start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice to Text</Text>
      <Button
        title={isListening ? 'Listening...' : 'Start Voice Input'}
        onPress={startListening}
        disabled={isListening}
      />
      <View style={styles.output}>
        <Text style={styles.transcript}>{transcript}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  output: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#fff',
    width: '100%',
    minHeight: 100,
  },
  transcript: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});
