import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CloseButton,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { removeReadingList } from '../redux/features/bookSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const ReadingList = () => {
  const { readingList } = useAppSelector((state) => state.book);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const handleRemoveReadingList = (id: string) => {
    dispatch(removeReadingList(id));
    toast({
      title: 'Book Removed.',
      description: 'Book removed  successfully from your reading list.',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  };
  return (
    <Card>
      <CardHeader>
        <Heading size='md'>My Reading List</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          {readingList.length ? (
            readingList.map((book) => (
              <Flex gap={10}>
                <Box key={book._id}>
                  <Heading size='xs' textTransform='uppercase'>
                    {book.title}
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {book.author}
                  </Text>
                </Box>
                <CloseButton
                  onClick={() => handleRemoveReadingList(book._id as string)}
                />
              </Flex>
            ))
          ) : (
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                No Book in reading list
              </Heading>
              <Text pt='2' fontSize='sm'>
                You don't have any book in reading list.{' '}
                <Text as={Link} color={'blue'} to={'/all-books'}>
                  Click Here{' '}
                </Text>{' '}
                for see books.
              </Text>
            </Box>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ReadingList;
