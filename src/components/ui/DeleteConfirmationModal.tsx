import { DeleteIcon, WarningIcon } from '@chakra-ui/icons';
import {
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDeleteBookMutation } from '../../redux/api/bookApi';
type IDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string | undefined;
};
const DeleteConfirmationModal = ({ isOpen, onClose, id }: IDeleteProps) => {
  const [deleteBook, { isLoading, data }] = useDeleteBookMutation();
  const toast = useToast();
  useEffect(() => {
    if (data?.success) {
      toast({
        title: 'Book Deleted',
        description: data?.message,
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      onClose();
    }
  }, [isLoading, data?.success, toast, data?.message, onClose]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <WarningIcon w={'sm'} color={'red'} />
            Are you sure want to delete this Book?
          </ModalHeader>
          <ModalCloseButton />
          <HStack pb={5} mx={'auto'}>
            <Button
              onClick={() => deleteBook(id)}
              colorScheme='red'
              rightIcon={<DeleteIcon />}>
              Yes
            </Button>
            <Button onClick={onClose} colorScheme='telegram'>
              No
            </Button>
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModal;
