import { SmallAddIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IBook } from '../../types/book.interface';
interface IProps {
  book: IBook;
}
const BookCard = ({ book }: IProps) => {
  const { title, img, genre, author, publicationDate, _id } = book;
  return (
    <Card maxW='xs' h={'470px'}>
      <CardBody pb={0}>
        <Image
          w={'50%'}
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
            rightIcon={<ViewIcon />}
            as={Link}
            to={`/books/${_id}`}
            variant='outline'
            colorScheme='blue'>
            Details
          </Button>
          <Button
            rightIcon={<SmallAddIcon />}
            variant='outline'
            colorScheme='blue'>
            Add to Wishlist
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
