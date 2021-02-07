import React, { useCallback } from 'react';

import { Button } from '../../components/Button'
import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

export const SignUp: React.FC = () => {
  const { signUp } = useAuth()

  const handleSignUp = useCallback(async () => {
    await signUp({ email: '', password: '', name: '', username: '' })
  }, [])

  return (
  <Container>
    <Button onPress={handleSignUp}>Sign Up</Button>
  </Container>
)};

