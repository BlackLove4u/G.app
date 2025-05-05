export const generateCard = (): (number | 'FREE')[][] => {
    const card: (number | 'FREE')[][] = [];
    for (let row = 0; row < 5; row++) {
      let rowData = [];
      for (let col = 0; col < 5; col++) {
        const min = col * 15 + 1;
        const max = col * 15 + 15;
        rowData.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      card.push(rowData);
    }
    card[2][2] = 'FREE';
    return card;
  };
  
  export const checkBingo = (card, called) => {
    const isMarked = (num: number | 'FREE') => num === 'FREE' || called.includes(num);
  
    for (let i = 0; i < 5; i++) {
      if (card[i].every(isMarked)) return true;
      if (card.map(row => row[i]).every(isMarked)) return true;
    }
  
    if ([0, 1, 2, 3, 4].every(i => isMarked(card[i][i]))) return true;
    if ([0, 1, 2, 3, 4].every(i => isMarked(card[i][4 - i]))) return true;
  
    return false;
  };
  