import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useGetBooksQuery } from '../../redux/api/bookApi';
import { saveBooks } from '../../redux/features/bookSlice';
import { useAppDispatch } from '../../redux/hooks';
import BookCard from '../shared/BookCard';

const RecentlyAdded = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const dispatch = useAppDispatch();
  const books = isLoading ? [] : data;
  useEffect(() => {
    if (data) {
      dispatch(saveBooks({ books: data }));
    }
  }, [isLoading, dispatch, data]);
  return (
    <Box>
      <Text as={'h4'} fontSize={'3xl'} fontWeight={'bold'} mb={5}>
        Recently Added Books
      </Text>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          xl: 'repeat(5, 1fr)'
        }}
        gap={6}>
        {books?.map((book) => (
          <GridItem key={book._id}>
            <BookCard book={book} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default RecentlyAdded;
