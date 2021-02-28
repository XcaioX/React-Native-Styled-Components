import * as Yup from 'yup';

import { fieldsToValidate } from './fields';

const { email } = fieldsToValidate;
const { password } = fieldsToValidate;

export interface SignInValues {
  email: string;
  password: string;
}

export const signInSchema = Yup.object().shape({
  email,
  password,
});
