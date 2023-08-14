import { SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea
} from '@chakra-ui/react';

import { useFormik } from 'formik';
import { useAddReviewMutation } from '../../redux/api/bookApi';
type IDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string | undefined;
};
const AddReviewModal = ({ isOpen, onClose, id }: IDeleteProps) => {
  const [addReview, { isLoading, data }] = useAddReviewMutation();

  const formik = useFormik({
    initialValues: {
      review: ''
    },

    onSubmit: async (values) => {
      addReview({ id: id, data: values });
    }
  });
  console.log(data);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} alignItems={'center'} gap={3}>
            Write a review for this book
            <SunIcon />
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <Box p={5} pt={0}>
              <Text fontWeight={'semibold'}>Add Review</Text>
              <Textarea
                id='review'
                name='review'
                value={formik.values.review}
                onChange={formik.handleChange}
                placeholder='Write review'
              />
            </Box>
            <HStack p={5}>
              <Button
                isLoading={isLoading}
                type='submit'
                colorScheme='linkedin'
                rightIcon={<SunIcon />}>
                Save
              </Button>
              <Button onClick={onClose} colorScheme='telegram'>
                No
              </Button>
            </HStack>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddReviewModal;
