import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const TaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:8000/tasks/');
    const data = await response.json();
    setTasks(data);
  };

  const createTask = async () => {
    const response = await fetch('http://localhost:8000/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, completed: false }),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  return (
    <View>
      <Text>Task Title</Text>
      <TextInput value={title} onChangeText={setTitle} />
      <Text>Task Description</Text>
      <TextInput value={description} onChangeText={setDescription} />
      <Button title="Create Task" onPress={createTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TaskScreen;
