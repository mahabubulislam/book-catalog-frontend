import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { useEffect } from 'react';
import BookCard from '../components/shared/BookCard';
import { useGetBooksQuery } from '../redux/api/bookApi';
import { saveBooks } from '../redux/features/bookSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const AllBooks = () => {
  const { searchBook } = useAppSelector((state) => state.book);
  const { data, isLoading } = useGetBooksQuery(searchBook);
  const dispatch = useAppDispatch();

  const books = isLoading ? [] : data;
  useEffect(() => {
    if (data) {
      dispatch(saveBooks({ books: data }));
    }
  }, [isLoading, dispatch, data]);
  return (
    <Box>
      {books?.length ? (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            xl: 'repeat(4, 1fr)'
          }}
          gap={6}>
          {books?.map((book) => (
            <GridItem key={book._id}>
              <BookCard book={book} />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Alert
          status='error'
          variant='subtle'
          width={'100%'}
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'>
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Book not found
          </AlertTitle>
          <AlertDescription maxWidth='sm'>
            No book found for this search keyword <strong>{searchBook}</strong>.
            Try with different keywords. Try search with Title, Author or Genre
          </AlertDescription>
        </Alert>
      )}
    </Box>
  );
};

export default AllBooks;
