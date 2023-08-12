import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { saveUser } from '../redux/features/userSlice';
import { useAppDispatch } from '../redux/hooks';
interface IUserLogin {
  email: string;
  password: string;
}
const Login = () => {
  const dispatch = useAppDispatch();
  const initialValues: IUserLogin = {
    email: '',
    password: ''
  };
  const userLoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters!')
      .required('Password is required')
  });
  const formik = useFormik({
    initialValues,
    validationSchema: userLoginSchema,
    onSubmit: (values) => {
      const data = { ...values, name: 'Mahbub' };
      dispatch(saveUser(data));
      alert(JSON.stringify(values, null, 2));
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
          Login
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder='example@mail.com'
            type='email'
            name='email'
            id='email'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text as={'small'} color={'red.700'}>
              {formik.errors.email}
            </Text>
          ) : null}
          <FormLabel my={3}>Password</FormLabel>
          <Input
            placeholder='********'
            type='password'
            name='password'
            id='password'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <Text as={'small'} color={'red.700'}>
              {formik.errors.password}
            </Text>
          ) : null}
          <Text as={'p'} mt={5}>
            Don't have an account ?{' '}
            <Text color={'teal'} as={Link} to={'/register'}>
              Register here
            </Text>
          </Text>
          <Button mt={4} colorScheme='teal' type='submit'>
            Login
          </Button>
        </form>
      </FormControl>
    </Container>
  );
};

export default Login;
