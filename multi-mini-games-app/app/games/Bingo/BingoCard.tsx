import React from 'react';
import { View, Text } from 'react-native';

interface BingoCardProps {
  card: (string | number)[][];
  called: (string | number)[];
}

const BingoCard: React.FC<BingoCardProps> = ({ card, called }) => {
  return (
    <View style={{ marginTop: 20 }}>
      {card.map((row, i) => (
        <View key={i} style={{ flexDirection: 'row' }}>
          {row.map((num, j) => (
            <View
              key={j}
              style={{
                width: 50,
                height: 50,
                backgroundColor: called.includes(num) ? '#6c5ce7' : '#dfe6e9',
                margin: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#2d3436', fontWeight: 'bold' }}>
                {num === 'FREE' ? '★' : num}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default BingoCard;
