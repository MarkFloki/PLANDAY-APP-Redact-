import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const addTask = async () => {
    try {
      const response = await fetch('http://localhost:8000/tasks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          date: date.toISOString(),
          completed: false,
        }),
      });
      const newTask = await response.json();
      navigation.navigate('Task', { newTask }); // Возвращаемся на главный экран
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <View>
      <Text>Создание задачи</Text>
      <TextInput
        placeholder="Название задачи"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Описание задачи"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Выбрать дату" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}
      <Button title="Добавить задачу" onPress={addTask} />
    </View>
  );
}
