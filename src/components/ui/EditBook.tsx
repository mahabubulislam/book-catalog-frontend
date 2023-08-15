import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useEditBookMutation } from '../../redux/api/bookApi';
import { IBook } from '../../types/book.interface';
interface IProps {
  book: IBook;
}
const EditBook = ({ book }: IProps) => {
  const [editBook, { data, isLoading }] = useEditBookMutation();
  const toast = useToast();
  const formik = useFormik({
    initialValues: book,

    onSubmit: async (values) => {
      editBook({ id: book._id, data: values });
    }
  });
  useEffect(() => {
    if (data?.success) {
      toast({
        title: 'Book updated.',
        description: data?.message,
        status: 'success',
        duration: 3000,
        isClosable: true
      });
    }
  }, [toast, data?.success, data?.message]);
  return (
    <Box flex={3}>
      <FormControl as={'section'} px={10} rounded={'md'}>
        <Text
          color='teal'
          as={'h4'}
          fontWeight={'bold'}
          fontSize={'3xl'}
          mb={5}>
          Edit Book: <strong>{book?._id}</strong>
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <FormLabel>Title</FormLabel>
          <Input
            type='title'
            name='title'
            id='title'
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title ? (
            <Text as={'small'} color={'red.700'}>
              {formik.errors.title}
            </Text>
          ) : null}
          <FormLabel my={3}>Author</FormLabel>
          <Input
            name='author'
            id='author'
            value={formik.values.author}
            onChange={formik.handleChange}
          />
          {formik.touched.author && formik.errors.author ? (
            <Text as={'small'} color={'red.700'}>
              {formik.errors.author}
            </Text>
          ) : null}
          <FormLabel my={3}>Publication Date</FormLabel>
          <Input
            name='publicationDate'
            id='publicationDate'
            value={formik.values.publicationDate}
            onChange={formik.handleChange}
          />
          {formik.touched.publicationDate && formik.errors.publicationDate ? (
            <Text as={'small'} color={'red.700'}>
              {formik.errors.publicationDate}
            </Text>
          ) : null}
          <FormLabel my={3}>Genre</FormLabel>
          <Input
            name='genre'
            id='genre'
            value={formik.values.genre}
            onChange={formik.handleChange}
          />
          {formik.touched.genre && formik.errors.genre ? (
            <Text as={'small'} color={'red.700'}>
              {formik.errors.genre}
            </Text>
          ) : null}

          <FormLabel my={3}>Banner</FormLabel>
          <Input
            name='img'
            id='img'
            value={formik.values.img}
            onChange={formik.handleChange}
          />
          {formik.touched.img && formik.errors.img ? (
            <Text as={'small'} color={'red.700'}>
              {formik.errors.img}
            </Text>
          ) : null}

          <Button isLoading={isLoading} mt={4} colorScheme='teal' type='submit'>
            Update
          </Button>
        </form>
      </FormControl>
    </Box>
  );
};

export default EditBook;
