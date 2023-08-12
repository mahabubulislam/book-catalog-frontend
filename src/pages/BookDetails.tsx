import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  Stack,
  Text
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import BookCard from '../components/shared/BookCard';
import useToken from '../hooks/useToken';
import { useGetSingleBookQuery } from '../redux/api/bookApi';
import { useAppSelector } from '../redux/hooks';

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const token = useToken();
  const { books } = useAppSelector((state) => state.book);
  return (
    <Box as='section' p={10}>
      <Card>
        <CardBody>
          <Flex gap={5}>
            <Skeleton isLoaded={!isLoading}>
              <Image src={data?.img} />
            </Skeleton>
            <Box>
              <SkeletonText isLoaded={!isLoading} noOfLines={6}>
                <Heading size='md'>{data?.title}</Heading>
                <Text>
                  {' '}
                  <strong>Author:</strong> {data?.author}
                </Text>
                <Text>
                  {' '}
                  <strong>Publication Date:</strong>
                  {new Date(data?.publicationDate as string).toDateString()}
                </Text>
                <Text>
                  <strong>Genre:</strong> {data?.genre}
                </Text>
                <Text size='md'>
                  {data?.reviews ? `Rating:${data?.reviews}` : ''}
                </Text>
              </SkeletonText>
              {token && (
                <Skeleton isLoaded={!isLoading}>
                  <Stack direction={'column'} mt={5}>
                    <Button rightIcon={<EditIcon />}>Edit</Button>
                    <Button rightIcon={<DeleteIcon />}>Delete</Button>
                  </Stack>
                </Skeleton>
              )}
            </Box>
          </Flex>
        </CardBody>
      </Card>
      <Box mt={5}>
        <Heading>You may also like</Heading>
        <Grid
          mt={5}
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            xl: 'repeat(5, 1fr)'
          }}
          gap={6}>
          {books?.slice(0, 5).map((book) => (
            <GridItem key={book._id}>
              <BookCard book={book} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BookDetails;
