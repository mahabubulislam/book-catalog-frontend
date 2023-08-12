import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useRegisterUserMutation } from '../redux/api/userApi';
import { saveUser } from '../redux/features/userSlice';
import { useAppDispatch } from '../redux/hooks';

interface IUserRegistration {
  name: string;
  email: string;
  password: string;
}
const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues: IUserRegistration = {
    name: '',
    email: '',
    password: ''
  };
  const userRegistrationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters!')
      .max(16, 'Password can be max 16 characters!')
      .required('Password is required')
  });
  const [register, { isLoading, data }] = useRegisterUserMutation();
  const formik = useFormik({
    initialValues,
    validationSchema: userRegistrationSchema,
    onSubmit: (values) => {
      register(values);
      if (data.success) {
        dispatch(saveUser(data.data.rest));
        navigate('/');
      }
    }
  });
  return (
    <Container h={'80vh'} alignItems={'center'} display={'flex'}>
      <FormControl as={'section'} boxShadow={'xl'} p={10} rounded={'md'}>
        <Text
          color='teal'
          as={'h4'}
          fontWeight={'bold'}
          fontSize={'3xl'}
          mb={5}>
          Register
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <FormLabel my={3}>Name</FormLabel>
          <Input
            value={formik.values.name}
            name='name'
            id='name'
            onChange={formik.handleChange}
            placeholder='John'
            type='text'
          />
          {formik.touched.name && formik.errors.name ? (
            <Text as={'small'} color={'red.700'}>
              {formik.errors.name}
            </Text>
          ) : null}

          <FormLabel>Email</FormLabel>
          <Input
            value={formik.values.email}
            name='email'
            id='email'
            onChange={formik.handleChange}
            placeholder='example@mail.com'
            type='email'
          />
          {formik.touched.email && formik.errors.email ? (
            <Text as={'small'} color={'red.700'}>
              {formik.errors.email}
            </Text>
          ) : null}
          <FormLabel my={3}>Password</FormLabel>
          <Input
            value={formik.values.password}
            name='password'
            id='password'
            onChange={formik.handleChange}
            placeholder='********'
            type='password'
          />
          {formik.touched.password && formik.errors.password ? (
            <Text as={'small'} color={'red.700'}>
              {formik.errors.password}
            </Text>
          ) : null}
          <Text as={'p'} mt={5}>
            Already have an account ?{' '}
            <Text color={'teal'} as={Link} to={'/login'}>
              Login here
            </Text>
          </Text>
          <Button isLoading={isLoading} mt={4} colorScheme='teal' type='submit'>
            Register
          </Button>
        </form>
      </FormControl>
    </Container>
  );
};

export default Register;
