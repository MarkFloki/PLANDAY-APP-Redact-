import React from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskScreen from './TaskScreen';
import CreateTaskScreen from './CreateTaskScreen';
import VoiceToTextScreen from './VoiceToTextScreen'; // Импорт нового экрана

const API_URL = 'http://127.0.0.1:8000/tasks';

const Stack = createStackNavigator();

export default function App() {
  // Состояния для задач
  const [task, setTask] = React.useState('');
  const [tasks, setTasks] = React.useState([]);

  // Функция получения задач
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Функция добавления новой задачи
  const addTask = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: task, completed: false }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Функция удаления задачи
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Эффект для загрузки задач при первом рендере
  React.useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tasks">
        {/* Экран со списком задач */}
        <Stack.Screen name="Tasks" options={{ title: 'Task Manager' }}>
          {() => (
            <View style={styles.container}>
              <Text style={styles.title}>Task Manager</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter a new task"
                value={task}
                onChangeText={setTask}
              />
              <Button title="Add Task" onPress={addTask} />
              <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.taskContainer}>
                    <Text style={styles.task}>{item.title}</Text>
                    <Button title="Delete" onPress={() => deleteTask(item.id)} />
                  </View>
                )}
              />
            </View>
          )}
        </Stack.Screen>

        {/* Экран создания новой задачи */}
        <Stack.Screen name="CreateTask" component={CreateTaskScreen} options={{ title: 'Create Task' }} />

        {/* Экран голосового ввода */}
        <Stack.Screen name="VoiceToText" component={VoiceToTextScreen} options={{ title: 'Voice to Text' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  task: {
    fontSize: 16,
  },
});
