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
import { IBook } from '../../types/book.interface';
interface IProps {
  book: IBook;
}
const BookCard = ({ book }: IProps) => {
  const { title, img, genre, author, publicationDate } = book;
  return (
    <Card maxW='xs'>
      <CardBody pb={0}>
        <Image
          w={'md'}
          src={img}
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
          <Button variant='solid' colorScheme='blue'>
            Read now
          </Button>
          <Button variant='ghost' colorScheme='blue'>
            Add to Wishlist
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
