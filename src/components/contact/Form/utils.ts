import * as Yup from 'yup';

export const initialValues = {
  name: '',
  email: '',
  message: ''
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string().email('Invalid email address').required('Please enter your email'),
  message: Yup.string().required('Please enter your message')
});