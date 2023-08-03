import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text
} from '@chakra-ui/react'

const Login = () => {
  return (
    <Container h={'80vh'} alignItems={'center'} display={'flex'}>
      <FormControl isRequired boxShadow={'xl'} p={10} rounded={'md'}>
        <Text
          color='teal'
          as={'h4'}
          fontWeight={'bold'}
          fontSize={'3xl'}
          mb={5}>
          Login
        </Text>
        <FormLabel>Email</FormLabel>
        <Input placeholder='example@mail.com' type='email' />
        <FormLabel my={3}>Password</FormLabel>
        <Input placeholder='********' type='password' />
        <Button mt={4} colorScheme='teal' type='submit'>
          Login
        </Button>
      </FormControl>
    </Container>
  )
}

export default Login
