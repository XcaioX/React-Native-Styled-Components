import React, { useCallback, useRef } from 'react';
import Yup from 'yup';

import { Form } from '@unform/mobile';
import { Button } from '../../components/Button';
import { Container } from './styles';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';

export const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const formRef = useRef(null);

  const handleSignIn = useCallback(async (data, { reset }) => {
    try {
      await signUp(data);

      formRef.current.clearErrors({});
      reset();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(err => (errorMessages[err.path] = err.message));

        formRef.current.setErrors(errorMessages);
      }
    }
  }, []);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSignIn}>
        <Input name="name" placeholder="Name" />
        <Input name="username" placeholder="Username" />
        <Input name="email" placeholder="example@email.com" />
        <Input name="password" placeholder="12QW!@as" />

        <Button onPress={() => formRef.current?.submitForm()}>Sign In</Button>
      </Form>
    </Container>
  );
};
