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
import { useEffect } from 'react';
import { useGetBooksQuery } from '../../redux/api/bookApi';
import { saveBooks } from '../../redux/features/bookSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import BookCard from '../shared/BookCard';
import Loading from '../shared/Loading';

const RecentlyAdded = () => {
  const { searchBook } = useAppSelector((state) => state.book);
  const { data, isLoading } = useGetBooksQuery({
    searchBook,
    sortBy: 'sortBy=createdAt'
  });
  const dispatch = useAppDispatch();
  const books = isLoading ? [] : data;
  useEffect(() => {
    if (data) {
      dispatch(saveBooks(data));
    }
  }, [isLoading, dispatch, data]);
  return (
    <Box>
      <Text as={'h4'} fontSize={'3xl'} fontWeight={'bold'} mb={5}>
        Recently Added Books
      </Text>
      {isLoading ? (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)'
          }}
          gap={4}>
          {[...Array(10)]?.map((_, i) => (
            <GridItem key={`home-book-${i}`}>
              <Loading />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <></>
      )}
      {books?.length && !isLoading ? (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)'
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
          status='info'
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

export default RecentlyAdded;
