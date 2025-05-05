import ConfettiCannon from 'react-native-confetti-cannon';

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import BingoCard from './BingoCard';
import { WalletContext } from '../../context/WalletContext';
import { generateCard, checkBingo } from './BingoUtils';

const ENTRY_FEE = 1;
const PRIZE = 5;

const BingoScreen = ({ navigation }) => {
  const walletContext = useContext(WalletContext);

  if (!walletContext) {
    throw new Error("WalletContext must be used within a WalletProvider");
  }

  const { balance, deductMoney, addMoney } = walletContext as WalletContextType;
  const [card, setCard] = useState<number[][]>([]);
  const [calledNumbers, setCalledNumbers] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);


  useEffect(() => {
    if (card.length === 0 && balance >= ENTRY_FEE) {
      deductMoney(ENTRY_FEE);
      setCard(generateCard());
    }
  }, []);

  useEffect(() => {
    if (checkBingo(card, calledNumbers)) {
      setGameOver(true);
      addMoney(PRIZE);
      setShowConfetti(true); // 👈 trigger animation
      Alert.alert("Bingo!", `You won $${PRIZE}`, [
        { text: "Play Again", onPress: () => {
          setShowConfetti(false); // reset confetti
          restartGame();
        }},
      ]);
    }
    
  }, [calledNumbers]);

  const callNumber = () => {
    const newNum = Math.floor(Math.random() * 75) + 1;
    if (!calledNumbers.includes(newNum)) {
      setCalledNumbers([...calledNumbers, newNum]);
    }
  };

  const restartGame = () => {
    if (balance < ENTRY_FEE) {
      Alert.alert("Not enough funds", "Add more money to continue.");
      navigation.goBack();
    } else {
      deductMoney(ENTRY_FEE);
      setCard(generateCard());
      setCalledNumbers([]);
      setGameOver(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Bingo Game</Text>
      <Text>Balance: ${balance}</Text>
      <Text>Called Numbers: {calledNumbers.join(', ')}</Text>
      <BingoCard card={card} called={calledNumbers} />
      <Button title="Call Number" onPress={callNumber} disabled={gameOver} />
      {showConfetti && (
  <ConfettiCannon count={100} origin={{ x: 200, y: 0 }} fadeOut={true} />
)}
      <Button title="Restart Game" onPress={restartGame} disabled={!gameOver} />
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
      {gameOver && <Text style={{ color: 'red', fontSize: 18 }}>Game Over! 🎉</Text>}
    </View>
  );
};

export default BingoScreen;
