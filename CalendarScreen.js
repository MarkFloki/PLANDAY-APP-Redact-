import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const CalendarScreen = () => {
  const [summary, setSummary] = useState('');
  const [location, setLocation] = useState('Online');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const createEvent = async () => {
    try {
      const response = await fetch('http://localhost:8000/create_event/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary,
          location,
          description,
          start,
          end,
        }),
      });
      const data = await response.json();
      alert(`Event created! Check your calendar: ${data.htmlLink}`);
    } catch (error) {
      console.error(error);
      alert('Failed to create event');
    }
  };

  return (
    <View>
      <Text>Event Summary</Text>
      <TextInput value={summary} onChangeText={setSummary} />

      <Text>Event Location</Text>
      <TextInput value={location} onChangeText={setLocation} />

      <Text>Event Description</Text>
      <TextInput value={description} onChangeText={setDescription} />

      <Text>Start Time (ISO format)</Text>
      <TextInput value={start} onChangeText={setStart} />

      <Text>End Time (ISO format)</Text>
      <TextInput value={end} onChangeText={setEnd} />

      <Button title="Create Event" onPress={createEvent} />
    </View>
  );
};

export default CalendarScreen;
