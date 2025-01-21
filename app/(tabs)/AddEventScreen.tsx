import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddEventScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/google_calendar/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          date: date.toISOString(),
        }),
      });

      if (response.ok) {
        alert("Event added to Google Calendar!");
        navigation.goBack();
      } else {
        console.error("Error adding event:", await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Pick Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
      )}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 8, marginBottom: 16, borderRadius: 4 },
});
