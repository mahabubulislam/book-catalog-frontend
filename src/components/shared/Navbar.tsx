import { Box, Flex, IconButton, Image, Input } from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
const Navbar = () => {
  return (
    <Box
      color={'#ffffff'}
      px={5}
      py={3}
      bg={'blue.900'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Flex as={Link} to='/' flex={3} alignItems={'center'}>
        <Image filter={'transparent'} w={12} src={logo} />
        <h4>My Book</h4>
      </Flex>
      <Box flex={2}>
        <Input placeholder='Search books' />
      </Box>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        flex={3}
        gap={5}
        justifyItems={'end'}
        justifyContent={'flex-end'}>
        <Link to={'/'}>Home</Link>
        <Link to={'/'}>Sign up</Link>
        <Link to={'/'}>All Books</Link>
      </Flex>
      <IconButton aria-label='nav' ml={5} />
    </Box>
  )
}

export default Navbar
