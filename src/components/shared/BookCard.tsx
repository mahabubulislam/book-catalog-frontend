import { MinusIcon, SmallAddIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import { removeWishlist, saveWishlist } from '../../redux/features/bookSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { IBook } from '../../types/book.interface';
interface IProps {
  book: IBook;
}
const BookCard = ({ book }: IProps) => {
  const { title, img, genre, author, publicationDate, _id } = book;
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((state) => state.book);
  const toast = useToast();
  const token = useToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleReadingList = () => {
    if (!token) {
      return navigate('/login');
    }
  };
  const handleWishlist = (type: string) => {
    if (!token) {
      return navigate('/login', { state: 'protected' });
    }
    if (type === 'add') {
      dispatch(saveWishlist(book));
      if (!wishlist.find((book) => book._id === _id)) {
        toast({
          title: 'Book Added.',
          description: 'Book added to wishlist successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true
        });
      } else {
        toast({
          title: 'Already in wishlist.',
          description: 'This Book already added to your wishlist.',
          status: 'warning',
          duration: 3000,
          isClosable: true
        });
      }
    } else {
      dispatch(removeWishlist(_id as string));
      toast({
        title: 'Book Removed.',
        description: 'Book removed  successfully from wishlist.',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    }
  };
  return (
    <Card maxH={'lg'} maxW={'400px'}>
      <CardBody pb={0}>
        <Image
          w={'30%'}
          src={
            img ||
            'https://angelbookhouse.com/assets/front/img/product/edition_placeholder.png'
          }
          alt={title}
          borderRadius='lg'
          objectFit={'cover'}
          objectPosition={'center'}
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{title}</Heading>
          <Text fontWeight={'semibold'}>{author}</Text>
          <Text>Genre:{genre}</Text>

          <Text color='blue.600'>
            Published: {new Date(publicationDate).toDateString()}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button
            size={'sm'}
            rightIcon={<ViewIcon />}
            as={Link}
            to={`/books/${_id}`}
            variant='outline'
            colorScheme='blue'>
            Details
          </Button>
          {pathname.includes('wishlist') ? (
            <Button
              size={'sm'}
              onClick={() => handleWishlist('remove')}
              rightIcon={<MinusIcon />}
              variant='outline'
              colorScheme='yellow'>
              Wishlist
            </Button>
          ) : (
            <Button
              size={'sm'}
              onClick={() => handleWishlist('add')}
              rightIcon={<SmallAddIcon />}
              variant='outline'
              colorScheme='blue'>
              Wishlist
            </Button>
          )}
          <Button
            size={'sm'}
            onClick={handleReadingList}
            rightIcon={<SmallAddIcon />}
            variant='outline'
            colorScheme='facebook'>
            Reading list
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
