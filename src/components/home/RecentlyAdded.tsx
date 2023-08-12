import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { useGetBooksQuery } from '../../redux/api/bookApi';
import BookCard from '../shared/BookCard';

const RecentlyAdded = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const books = isLoading ? [] : data;
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
          <GridItem>
            <BookCard book={book} key={book._id} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default RecentlyAdded;
