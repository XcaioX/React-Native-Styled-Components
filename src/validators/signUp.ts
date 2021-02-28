import * as Yup from 'yup';

import { fieldsToValidate } from './fields';

const { name } = fieldsToValidate;
const { username } = fieldsToValidate;
const { email } = fieldsToValidate;
const { password } = fieldsToValidate;
const { confirmPassword } = fieldsToValidate;

export interface SignUpValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signUpSchema = Yup.object().shape({
  name,
  username,
  email,
  password,
  confirmPassword,
});
