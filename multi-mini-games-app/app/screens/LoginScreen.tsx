import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    // For now, just go to Home and assign $5 default
    navigation.navigate('Home', { user: username });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>Welcome!</Text>
      <TextInput
        placeholder="Enter your name"
        onChangeText={setUsername}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;