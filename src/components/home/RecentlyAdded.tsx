import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import { IBook } from '../../types/book.interface'
import BookCard from '../shared/BookCard'

const RecentlyAdded = () => {
  const books: Array<IBook> = [1, 2, 3, 4, 4, 5, 76, 89, 6, 7]
  return (
    <Box>
      <Text as={'h4'} fontSize={'3xl'} fontWeight={'bold'} mb={5}>
        Recently Added Books
      </Text>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          xl: 'repeat(4, 1fr)'
        }}
        gap={6}>
        {books.map((book) => (
          <GridItem>
            <BookCard book={book} key={book._id} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default RecentlyAdded
