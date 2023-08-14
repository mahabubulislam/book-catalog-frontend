import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useCreateBookMutation } from '../redux/api/bookApi';
import { IBook } from '../types/book.interface';

const AddNewBook = () => {
  const book: IBook = {
    title: '',
    author: '',
    genre: '',
    img: '',
    publicationDate: ''
  };
  const [createBook, { data, isLoading }] = useCreateBookMutation();
  const formik = useFormik({
    initialValues: book,

    onSubmit: async (values) => {
      createBook(values);
    }
  });
  console.log(data);
  return (
    <Box p={10}>
      <FormControl as={'section'} px={10} rounded={'md'}>
        <Text
          color='teal'
          as={'h4'}
          fontWeight={'bold'}
          fontSize={'3xl'}
          mb={5}>
          Add new book
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <FormLabel>Title</FormLabel>
          <Input
            type='title'
            name='title'
            id='title'
            value={formik.values.title}
            placeholder='Book Title
            '
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title ? (
            <Text as={'small'} color={'red.700'}>
              {formik.errors.title}
            </Text>
          ) : null}
          <FormLabel my={3}>Author</FormLabel>
          <Input
            placeholder='Author Name'
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
            placeholder='Publication Date'
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
            placeholder='Genre'
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
            placeholder='Img url'
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

          <Button
            isLoading={isLoading}
            mt={4}
            colorScheme='linkedin'
            type='submit'>
            Save
          </Button>
        </form>
      </FormControl>
    </Box>
  );
};

export default AddNewBook;
