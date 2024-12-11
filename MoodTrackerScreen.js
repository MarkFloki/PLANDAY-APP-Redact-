import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const MoodTrackerScreen = () => {
  const [mood, setMood] = useState('');

  const submitMood = async () => {
    const response = await fetch('http://localhost:8000/mood/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: new Date().toISOString().split('T')[0],
        mood_level: parseInt(mood),
      }),
    });
    const data = await response.json();
    alert(`Mood recorded: ${data.mood_level}`);
  };

  return (
    <View>
      <Text>How are you feeling today? (Rate 1 to 5)</Text>
      <TextInput value={mood} onChangeText={setMood} keyboardType="numeric" />
      <Button title="Submit Mood" onPress={submitMood} />
    </View>
  );
};

export default MoodTrackerScreen;
