import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { Container } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const { registerField, fieldName, error, defaultValue } = useField(name);
  const inputRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <Container>
      <TextInput
        defaultValue={defaultValue}
        keyboardAppearance="dark"
        placeholderTextColor=""
        onChangeText={value => (inputRef.current.value = value)}
        {...rest}
      />

      {error && <span>{error}</span>}
    </Container>
  );
};

export default Input;
