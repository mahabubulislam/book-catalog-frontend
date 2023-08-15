import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import useToken from '../../hooks/useToken';
import { saveSearchBook } from '../../redux/features/bookSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const token = useToken();
  const NavItems = (
    <>
      <Link to={'/'}>Home</Link>
      <Link to={'/all-books'}>All Books</Link>
      {!token && <Link to={'/login'}>Login</Link>}
    </>
  );
  const MenuBar = (
    <Box ml={5}>
      <Menu>
        <MenuButton title={user?.email}>
          <Flex alignItems={'center'}>
            <Avatar size={{ base: 'sm', md: 'md' }} name={user?.name} />

            <ChevronDownIcon />
          </Flex>
        </MenuButton>
        <MenuList zIndex={9999} bg={'blue.900'}>
          <MenuItem bg={'blue.900'} as={Link} to={'/reading-list'}>
            Reading List
          </MenuItem>
          <MenuItem bg={'blue.900'} as={Link} to={'/wishlist'}>
            Wish List
          </MenuItem>
          <MenuItem bg={'blue.900'} as={Link} to={'/add-new-book'}>
            Add New Book
          </MenuItem>
          <MenuItem
            bg={'blue.900'}
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
  return (
    <Box
      color={'#ffffff'}
      px={8}
      py={3}
      bg={'blue.900'}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Flex as={Link} to='/' flex={3} alignItems={'center'}>
        <Image filter={'transparent'} w={12} src={logo} />
        <Text as={'h4'} fontFamily={'cursive'}>
          BookHaven
        </Text>
      </Flex>
      <Box flex={2} display={{ base: 'none', md: 'block' }}>
        <Input
          placeholder='Search books'
          onChange={(e) => dispatch(saveSearchBook(e.target.value))}
        />
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
      {token && MenuBar}
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
  );
};

export default Navbar;
