# G.app

## 📁 STEP 2: FOLDER STRUCTURE FOR MOBILE MINI-GAME APP

We'll call the project:
`/multi-mini-games-app`

Here’s my idea for App structure:

```
/multi-mini-games-app
│
├── /app                      # React Native app source
│   ├── /assets               # Images, fonts, sounds
│   ├── /components           # Reusable UI components
│   ├── /screens              # Game screens, login, wallet, etc.
│   ├── /games                # Mini-games (modular folders)
│   ├── /navigation           # Navigation config (stack/tabs)
│   ├── /services             # API calls, Firebase/Stripe logic
│   ├── /context              # Global state (Auth, Wallet, etc.)
│   ├── /utils                # Helpers, constants
│   └── App.tsx               # Main entry file
│
├── /server                   # Node.js backend API
│   ├── /controllers          # Logic for wallet, games, users
│   ├── /models               # Database models (e.g., Prisma or Sequelize)
│   ├── /routes               # API routes
│   ├── /middleware           # Auth checks, error handlers
│   ├── /services             # Game logic, payouts, etc.
│   └── server.js             # Entry point
│
├── /docs                     # Planning, designs, game rules
│   ├── game-flow.md
│   ├── api-spec.md
│   └── roadmap.md
│
├── /shared                   # Shared interfaces, constants
│
├── .gitignore
├── README.md
└── package.json
```

---

## ✅ INITIAL SETUP INSTRUCTIONS

### 📦 Step-by-Step to Set Up React Native App

Run the following in terminal:

```bash
npx create-expo-app multi-mini-games-app
cd multi-mini-games-app
npm install @react-navigation/native @react-navigation/native-stack react-native-paper
```

Then inside `multi-mini-games-app/`, create these folders:

```bash
mkdir -p app/{assets,components,screens,games,navigation,services,context,utils}
touch app/App.tsx
```

> We’ll use **Expo** (from `create-expo-app`) because it makes development faster and easier to test on your phone.

---

## 📌 GitHub Setup

Now:

1. Create a new repo on GitHub: `multi-mini-games-app`
2. Push your new project:

```bash
git init
git add .
git commit -m "Initial mobile game app setup"
git remote add origin https://github.com/YOUR_USERNAME/multi-mini-games-app.git
git push -u origin main
```

---

✅ I have the shell of your full app: mobile-first, modular, and ready to scale.

---

Which starter files should i start with? :

* `App.tsx`
* Navigation setup
* First screen (e.g., Home or Login)?
  Or would you like to begin with **User Authentication + Wallet system backend** next?
-----------
Excellent choice. Let's build this **from the ground up**, so it’s easy to extend, test, and impress. We’ll now set up:

1. ✅ `App.tsx` starter
2. ✅ Navigation (`navigation/`)
3. ✅ First screen: `LoginScreen`
4. ✅ Wallet setup (context/state)
5. ✅ Basic server folder + `server.js`

---

# 📱 1. `App.tsx` (entry file)

Save this at: `app/App.tsx`

```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './navigation/AppNavigator';
import { WalletProvider } from './context/WalletContext';

export default function App() {
  return (
    <WalletProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </WalletProvider>
  );
}
```

---

# 🧭 2. Navigation Setup

### ➕ Install navigation dependencies (if not yet):

```bash
npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-paper
```

### 📁 Create: `app/navigation/AppNavigator.tsx`

```tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);
```

---

# 🔐 3. Screens

### 📁 Create: `app/screens/LoginScreen.tsx`

```tsx
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
```

---

### 📁 Create: `app/screens/HomeScreen.tsx`

```tsx
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
```

---

# 💰 4. Wallet System (Context)

### 📁 Create: `app/context/WalletContext.tsx`

```tsx
import React, { createContext, useState } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(5); // Start with $5

  const addMoney = (amount) => {
    setBalance(prev => prev + amount);
  };

  const deductMoney = (amount) => {
    setBalance(prev => Math.max(prev - amount, 0));
  };

  return (
    <WalletContext.Provider value={{ balance, addMoney, deductMoney }}>
      {children}
    </WalletContext.Provider>
  );
};
```

---

# 🛠 5. Backend Setup

### 📁 `/server/server.js`

```js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = {}; // In-memory user wallet

app.post('/api/login', (req, res) => {
  const { username } = req.body;
  if (!users[username]) {
    users[username] = { balance: 5 };
  }
  res.json({ user: username, balance: users[username].balance });
});

app.post('/api/add-money', (req, res) => {
  const { username, amount } = req.body;
  if (users[username]) {
    users[username].balance += amount;
    return res.json({ balance: users[username].balance });
  }
  res.status(404).json({ error: 'User not found' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

> ✅ This gives us:

* A mobile app login
* Wallet with starting \$5
* Add money logic
* Backend to track balances (basic, we’ll expand)
* React Navigation ready for new games/screens

---

What I would like to start next:

1. 🎮 First Game Setup (e.g. Bingo UI)?
2. 🔄 Connecting frontend wallet to backend via API?
3. 🔐 Firebase Auth Integration?

Piece I would you like to continue with next?
Excellent choice. Let's build this **from the ground up**, so it’s easy to extend, test, and impress. We’ll now set up:

1. ✅ `App.tsx` starter
2. ✅ Navigation (`navigation/`)
3. ✅ First screen: `LoginScreen`
4. ✅ Wallet setup (context/state)
5. ✅ Basic server folder + `server.js`

---

# 📱 1. `App.tsx` (entry file)

Save this at: `app/App.tsx`

```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './navigation/AppNavigator';
import { WalletProvider } from './context/WalletContext';

export default function App() {
  return (
    <WalletProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </WalletProvider>
  );
}
```

---

# 🧭 2. Navigation Setup

### ➕ Install navigation dependencies (if not yet):

```bash
npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-paper
```

### 📁 Create: `app/navigation/AppNavigator.tsx`

```tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);
```

---

# 🔐 3. Screens

### 📁 Create: `app/screens/LoginScreen.tsx`

```tsx
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
```

---

### 📁 Create: `app/screens/HomeScreen.tsx`

```tsx
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
```

---

# 💰 4. Wallet System (Context)

### 📁 Create: `app/context/WalletContext.tsx`

```tsx
import React, { createContext, useState } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(5); // Start with $5

  const addMoney = (amount) => {
    setBalance(prev => prev + amount);
  };

  const deductMoney = (amount) => {
    setBalance(prev => Math.max(prev - amount, 0));
  };

  return (
    <WalletContext.Provider value={{ balance, addMoney, deductMoney }}>
      {children}
    </WalletContext.Provider>
  );
};
```

---

# 🛠 5. Backend Setup

### 📁 `/server/server.js`

```js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = {}; // In-memory user wallet

app.post('/api/login', (req, res) => {
  const { username } = req.body;
  if (!users[username]) {
    users[username] = { balance: 5 };
  }
  res.json({ user: username, balance: users[username].balance });
});

app.post('/api/add-money', (req, res) => {
  const { username, amount } = req.body;
  if (users[username]) {
    users[username].balance += amount;
    return res.json({ balance: users[username].balance });
  }
  res.status(404).json({ error: 'User not found' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

> ✅ This gives us:

* A mobile app login
* Wallet with starting \$5
* Add money logic
* Backend to track balances (basic, we’ll expand)
* React Navigation ready for new games/screens

---

What I will be working on next:

1. 🎮 First Game Setup (e.g. Bingo UI)?
2. 🔄 Connecting frontend wallet to backend via API?
3. 🔐 Firebase Auth Integration?


