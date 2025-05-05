import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { WalletContext } from '../context/WalletContext';

const HomeScreen = ({ route }) => {
  const { user } = route.params;
  const { balance, addMoney } = useContext(WalletContext);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Hello {user} 👋</Text>
      <Text style={{ fontSize: 18, marginVertical: 10 }}>Wallet Balance: ${balance}</Text>
      <Button title="Add $5" onPress={() => addMoney(5)} />
    </View>
  );
};

export default HomeScreen;