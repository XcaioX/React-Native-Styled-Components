import React from 'react'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

import { api } from '../services/index'

interface SignUpData {
  name: string
  username: string
  email: string
  password: string
}

interface SignInData {
  email: string
  password: string
}

interface AuthData {
  token: string
  user: any
}

interface AuthContextData {
  authData: AuthData
  loading: boolean
  signIn(credentials: SignInData): Promise<void>;
  signOut(): Promise<void>;
  signUp(credentials: SignUpData): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadStorage = async () => {
      const storageCredentials = await AsyncStorage.multiGet(['@Auth:user', '@Auth:token'])
      const user = storageCredentials[0]
      const token = storageCredentials[1]

      if (user && token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setData(JSON.parse(JSON.stringify({ user, token })))
      }

      setLoading(false)
    }

    loadStorage()
  }, [])

  const signIn = useCallback(async (credentials: SignInData): Promise<void> => {
    const response = await api.post('/auth/signin', credentials)

    const { token, user } = response.data

    await AsyncStorage.multiSet([['@Auth:user', user], ['@Auth:token', token]])
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    setData({ token, user })
  }, [])

  const signOut = useCallback(async (): Promise<void> => {
    AsyncStorage.multiRemove(['@Auth:user', '@Auth:token']).then(() => setData(null))
    axios.defaults.headers.common['Authorization'] = '';
  }, [])

  const signUp = useCallback( async (credentials: SignUpData) => {
    await api.post('/auth/signup', credentials)
  }, [])

  return (
    <AuthContext.Provider value={{ authData: data, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error('useAuth must be within an AuthProvider')

  return context
}
