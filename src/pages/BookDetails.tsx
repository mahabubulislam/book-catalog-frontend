import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  ListItem,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  UnorderedList,
  useDisclosure
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import BookCard from '../components/shared/BookCard';
import DeleteConfirmationModal from '../components/ui/DeleteConfirmationModal';
import useToken from '../hooks/useToken';
import { useGetSingleBookQuery } from '../redux/api/bookApi';
import { useAppSelector } from '../redux/hooks';

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const token = useToken();
  const { books } = useAppSelector((state) => state.book);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <DeleteConfirmationModal isOpen={isOpen} onClose={onClose} id={id} />
      <Box as='section' p={10}>
        <Card>
          {data?._id ? (
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
                    <Box>
                      {data?.reviews ? (
                        <>
                          <strong>Reviews:</strong>
                          <UnorderedList>
                            {data?.reviews.map((review, index) => (
                              <ListItem key={`review-${index}`}>
                                {review}
                              </ListItem>
                            ))}
                          </UnorderedList>
                        </>
                      ) : (
                        ''
                      )}
                    </Box>
                  </SkeletonText>
                  {token && (
                    <Skeleton isLoaded={!isLoading}>
                      <Stack direction={'column'} mt={5}>
                        <Button rightIcon={<EditIcon />}>Edit</Button>
                        <Button
                          onClick={onOpen}
                          colorScheme='red'
                          rightIcon={<DeleteIcon />}>
                          Delete
                        </Button>
                      </Stack>
                    </Skeleton>
                  )}
                </Box>
              </Flex>
            </CardBody>
          ) : (
            <Alert
              status='error'
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              height='200px'>
              <AlertIcon boxSize='40px' mr={0} />
              <AlertTitle mt={4} mb={1} fontSize='lg'>
                Book not found
              </AlertTitle>
              <AlertDescription maxWidth='sm'>
                Book not found with this id {id}
              </AlertDescription>
            </Alert>
          )}
        </Card>
        <Box mt={5}>
          <Heading>You may also like</Heading>
          <Grid
            mt={5}
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              xl: 'repeat(4, 1fr)'
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
    </>
  );
};

export default BookDetails;
