import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Grid,
  GridItem,
  Text
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import BookCard from '../components/shared/BookCard';
import { useAppSelector } from '../redux/hooks';

const Wishlist = () => {
  const { wishlist } = useAppSelector((state) => state.book);
  return (
    <Box p={10}>
      {wishlist?.length ? (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            xl: 'repeat(4, 1fr)'
          }}
          gap={4}>
          {wishlist?.map((book) => (
            <GridItem key={book._id}>
              <BookCard book={book} />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Alert
          status='info'
          variant='subtle'
          width={'100%'}
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'>
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            No book found in wishlist
          </AlertTitle>
          <AlertDescription maxWidth='sm'>
            <Text>You don't have any book in wishlist</Text>
            <Text color='blue' as={Link} to={'/all-books'}>
              Visit book
            </Text>
          </AlertDescription>
        </Alert>
      )}
    </Box>
  );
};

export default Wishlist;
