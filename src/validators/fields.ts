import * as Yup from 'yup';

export interface FormValues {
  name: any;
  username: any;
  email: any;
  password: any;
  confirmPassword: any;
}

export const fieldsToValidate: FormValues = {
  name: Yup.string().min(2, 'Name too short!').required('Name required'),
  username: Yup.string()
    .min(2, 'Username too short!')
    // .notOneOf([], 'Username already taken')
    .required('Username required'),
  email: Yup.string()
    .lowercase()
    .trim()
    .email('Invalid email!')
    // .notOneOf([], 'Email already taken')
    .required('Email required'),
  password: Yup.string()
    .min(6, 'Too short!')
    .matches(/(?=.*[a-z])/, 'One lowercase letter required!')
    .matches(/(?=.*[A-Z])/, 'One uppercase letter required!')
    .matches(/(?=.*[0-9])/, 'One number letter required!')
    .required('Password required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Password must be confirmed'),
};
