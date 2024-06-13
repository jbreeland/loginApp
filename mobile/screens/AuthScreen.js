import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const onSubmitHandler = () => {
    const payload = {
      email,
      password,
    };

    fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(async res => {
      const jsonRes = await res.json();
      if (res.status !== 200) {
        setIsError(true);
        setMessage(jsonRes.message);
      } else {
        setIsError(false);
        setMessage(jsonRes.message);
        console.log('Token:', jsonRes.token); // Handle token as needed
      }
    })
    .catch(err => {
      console.log(err);
      setIsError(true);
      setMessage('An error occurred. Please try again later.');
    });
  };

  const onChangeHandler = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text>{isLogin ? 'Login' : 'Signup'}</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
      <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword} />
      <Text style={{ color: isError ? 'red' : 'green' }}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
        <Text>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onChangeHandler}>
        <Text>{isLogin ? 'Switch to Signup' : 'Switch to Login'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
  }
});

export default AuthScreen;