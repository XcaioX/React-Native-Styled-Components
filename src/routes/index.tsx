import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useAuth } from '../hooks/auth'
// import RNSplashScreen from 'react-native-splash-screen';

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

const Routes: React.FC = () => {
  const { authData, loading } = useAuth()

  if (loading) {
    // RNSplashScreen.show();

    return (
      <View>
        <ActivityIndicator size='large' color='#666' />
      </View>
    )
  }

  return authData ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
