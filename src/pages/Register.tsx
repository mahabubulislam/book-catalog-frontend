import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <Container h={'80vh'} alignItems={'center'} display={'flex'}>
      <FormControl isRequired boxShadow={'xl'} p={10} rounded={'md'}>
        <Text
          color='teal'
          as={'h4'}
          fontWeight={'bold'}
          fontSize={'3xl'}
          mb={5}>
          Register
        </Text>
        <FormLabel>Email</FormLabel>
        <Input placeholder='example@mail.com' type='email' />
        <FormLabel my={3}>Password</FormLabel>
        <Input placeholder='********' type='password' />
        <FormLabel my={3}>Mobile</FormLabel>
        <Input placeholder='0146354344' type='number' />
        <Text as={'p'} mt={5}>
          Already have an account ?{' '}
          <Text color={'teal'} as={Link} to={'/login'}>
            Login here
          </Text>
        </Text>
        <Button mt={4} colorScheme='teal' type='submit'>
          Register
        </Button>
      </FormControl>
    </Container>
  )
}

export default Register
