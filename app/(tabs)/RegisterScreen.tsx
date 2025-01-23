import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/auth/register', {
        username,
        password,
      });
      setMessage(response.data.message);
      setUsername('');
      setPassword('');
      // Перехід до екрану завдань після реєстрації
      navigation.navigate('Tasks');
    } catch (error: any) {
      setMessage(
        error.response?.data?.detail || 'Не вдалося зареєструватися. Спробуйте ще раз.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>
      <TextInput
        style={styles.input}
        placeholder="Ім'я користувача"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Реєстрація" onPress={handleRegister} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});
