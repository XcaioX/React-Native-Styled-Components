import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';
import { AuthProvider } from './hooks/auth';

const App: React.FC = () => (
  <NavigationContainer>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </NavigationContainer>
);

export default App;
