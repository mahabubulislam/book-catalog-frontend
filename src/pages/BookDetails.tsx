import { ArrowBackIcon, DeleteIcon, EditIcon, SunIcon } from '@chakra-ui/icons';
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
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookCard from '../components/shared/BookCard';
import AddReviewModal from '../components/ui/AddReviewModal';
import DeleteConfirmationModal from '../components/ui/DeleteConfirmationModal';
import EditBook from '../components/ui/EditBook';
import useToken from '../hooks/useToken';
import { useGetSingleBookQuery } from '../redux/api/bookApi';
import { useAppSelector } from '../redux/hooks';
import { IBook } from '../types/book.interface';

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);

  const token = useToken();
  const { books, searchBook } = useAppSelector((state) => state.book);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isReviewOpen,
    onOpen: onReviewOpen,
    onClose: onReviewClose
  } = useDisclosure();
  const [openEdit, setOpenEdit] = useState(false);
  const searchBooks = () => {
    const searchValue = searchBook?.toLowerCase();

    const filteredBooks = books.filter(
      (book: IBook) =>
        book.title.toLowerCase().includes(searchValue as string) ||
        book.genre.toLowerCase().includes(searchValue as string) ||
        book.author.toLowerCase().includes(searchValue as string)
    );

    return filteredBooks;
  };
  return (
    <>
      <AddReviewModal id={id} isOpen={isReviewOpen} onClose={onReviewClose} />
      <DeleteConfirmationModal isOpen={isOpen} onClose={onClose} id={id} />
      <Box as='section' p={10}>
        <Card>
          {data?._id ? (
            <CardBody>
              <Flex gap={5}>
                <Skeleton isLoaded={!isLoading}>
                  <Image src={data?.img} />
                </Skeleton>
                <Box mr={10}>
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
                        <Button
                          colorScheme='linkedin'
                          onClick={() => setOpenEdit(!openEdit)}
                          rightIcon={<EditIcon />}>
                          Edit
                        </Button>
                        <Button
                          onClick={onOpen}
                          colorScheme='red'
                          rightIcon={<DeleteIcon />}>
                          Delete
                        </Button>
                        <Button
                          onClick={onReviewOpen}
                          colorScheme='facebook'
                          rightIcon={<SunIcon />}>
                          Give Review
                        </Button>
                      </Stack>
                    </Skeleton>
                  )}
                  <Stack mt={2}>
                    <Button
                      as={Link}
                      to={'/'}
                      colorScheme='messenger'
                      rightIcon={<ArrowBackIcon />}>
                      Back
                    </Button>
                  </Stack>
                </Box>
                {openEdit && <EditBook book={data} />}
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
        {books.length ? (
          <Box mt={5}>
            <Heading>You may also like</Heading>
            {searchBooks()?.length ? (
              <Grid
                mt={5}
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                  xl: 'repeat(4, 1fr)'
                }}
                gap={6}>
                {searchBooks()
                  .slice(0, 5)
                  .map((book) => (
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
                  No book found for this search keyword{' '}
                  <strong>{searchBook}</strong>. Try with different keywords.
                  Try search with Title, Author or Genre
                </AlertDescription>
              </Alert>
            )}
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default BookDetails;
