import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import BookCard from '../components/shared/BookCard';
import Loading from '../components/shared/Loading';
import { useGetBooksQuery } from '../redux/api/bookApi';
import { saveBooks } from '../redux/features/bookSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const AllBooks = () => {
  const { searchBook } = useAppSelector((state) => state.book);
  const [date, setDate] = useState('');
  const [genre, setGenre] = useState('');
  const { data, isLoading } = useGetBooksQuery({
    searchBook,
    publicationDate: date,
    genre
  });
  const dispatch = useAppDispatch();

  const books = isLoading ? [] : data;
  useEffect(() => {
    if (data) {
      dispatch(saveBooks(data));
    }
  }, [isLoading, dispatch, data]);
  const genres = ['Programming', 'Non-Programming', 'Romance', 'Frictions'];

  return (
    <Box p={10}>
      <Flex flexDirection={{ base: 'column', md: 'row' }} gap={10} mb={5}>
        <Box>
          <Text>Filter By Genre</Text>
          <Select
            onChange={(e) => setGenre(e.target.value)}
            placeholder='Select Genre'>
            {genres?.map((genre, i) => (
              <option key={`genre-${i}`} value={genre}>
                {genre}
              </option>
            ))}
          </Select>
        </Box>
        <Box>
          <Text>Filter By Publication Year</Text>
          <Input type='date' onChange={(e) => setDate(e.target.value)} />
        </Box>
      </Flex>
      {isLoading ? (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            xl: 'repeat(3, 1fr)'
          }}
          gap={4}>
          {[...Array(10)]?.map((_, i) => (
            <GridItem key={`book-${i}`}>
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
          gap={4}>
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
            {!date && !genre && (
              <Text>
                No book found for this search keyword
                <strong> {searchBook}</strong>. Try with different keywords. Try
                search with Title, Author or Genre
              </Text>
            )}
            {date && (
              <Text>
                No book found for this publication date
                <strong>
                  {' '}
                  {new Date(date).toLocaleString().split(',')[0]}
                </strong>
                . Try with different dates.
              </Text>
            )}
            {genre && (
              <Text>
                No book found for this genre
                <strong> {genre}</strong>. Try with different genre.
              </Text>
            )}
          </AlertDescription>
        </Alert>
      )}
    </Box>
  );
};

export default AllBooks;
