import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const NavItems = (
    <>
      <Link to={'/'}>Home</Link>
      <Link to={'/'}>Sign up</Link>
      <Link to={'/'}>All Books</Link>
    </>
  )
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
      <Box flex={2} display={{ base: 'none', md: 'block' }}>
        <Input placeholder='Search books' />
      </Box>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        flex={3}
        gap={5}
        justifyItems={'end'}
        justifyContent={'flex-end'}>
        {NavItems}
      </Flex>
      <HamburgerIcon display={{ base: 'block', md: 'none' }} onClick={onOpen} />
      <Drawer placement={'top'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={'blue.900'}>
          <DrawerBody pb={3}>
            <Input placeholder='Search books' my={5} />
            <VStack color={'#ffffff'} justifyItems={'flex-start'}>
              {NavItems}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Navbar
