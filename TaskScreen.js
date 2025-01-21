import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';

export default function TaskScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:8000/tasks/');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:8000/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <View>
      <Text>Task Manager</Text>
      {/* Кнопка перехода на экран создания задачи */}
      <Button
        title="Создать задачу"
        onPress={() => navigation.navigate('CreateTask')}
      />
      {/* Список задач */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Button title="Удалить" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
