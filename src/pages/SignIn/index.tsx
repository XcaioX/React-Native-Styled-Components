import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/mobile';
import Yup from 'yup';

import { Button } from '../../components/Button';
import { Container } from './styles';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import { signInSchema } from '../../validators/signIn';

export const SignIn: React.FC = () => {
  const formRef = useRef(null);
  const { signIn } = useAuth();

  const handleSignIn = useCallback(async (data, { reset }) => {
    try {
      await signInSchema.validate(data, {
        abortEarly: false,
      });

      await signIn(data);

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
        <Input name="email" placeholder="example@email.com" />
        <Input name="password" placeholder="12QW!@as" />

        <Button onPress={() => formRef.current?.submitForm()}>Sign In</Button>
      </Form>
    </Container>
  );
};
