import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text
} from '@chakra-ui/react'
import { IBook } from '../../types/book.interface'
interface IProps {
  book: IBook
}
const BookCard = ({ book }: IProps) => {
  return (
    <Card maxW='sm'>
      <CardBody>
        <Image
          src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>Habluder Jonno Programming</Heading>
          <Text>Jhankar Mahbub</Text>
          <Text color='blue.600' fontSize='2xl'>
            Published: 12-12-12
          </Text>
        </Stack>
      </CardBody>

      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue'>
            Buy now
          </Button>
          <Button variant='ghost' colorScheme='blue'>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default BookCard
