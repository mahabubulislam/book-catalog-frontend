import { DeleteIcon, WarningIcon } from '@chakra-ui/icons';
import {
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteBookMutation } from '../../redux/api/bookApi';
type IDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string | undefined;
};
const DeleteConfirmationModal = ({ isOpen, onClose, id }: IDeleteProps) => {
  const navigate = useNavigate();
  const [deleteBook, { isLoading, data }] = useDeleteBookMutation();
  useEffect(() => {
    if (data?.success) {
      navigate('/');
    }
  }, [isLoading, data?.success, navigate]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure want to delete this Book? <WarningIcon />
          </ModalHeader>
          <ModalCloseButton />
          <HStack p={5}>
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
