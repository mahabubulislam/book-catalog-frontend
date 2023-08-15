import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  Stack,
  Text
} from '@chakra-ui/react';

const Loading = () => {
  return (
    <Card maxH={'lg'} maxW={'400px'}>
      <CardBody pb={0}>
        <Skeleton>
          <Image
            w={'30%'}
            src={
              'https://angelbookhouse.com/assets/front/img/product/edition_placeholder.png'
            }
            borderRadius='lg'
            objectFit={'cover'}
            objectPosition={'center'}
          />
        </Skeleton>
        <SkeletonText>
          <Stack mt='6' spacing='3'>
            <Heading size='md'>Book Title</Heading>
            <Text fontWeight={'semibold'}>author</Text>
            <Text>Genre:</Text>

            <Text color='blue.600'>Published:</Text>
          </Stack>
        </SkeletonText>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Skeleton>
            <Button size={'sm'} variant='outline' colorScheme='blue'>
              Details
            </Button>
          </Skeleton>
          <Skeleton>
            <Button size={'sm'} variant='outline' colorScheme='blue'>
              Details
            </Button>
          </Skeleton>
          <Skeleton>
            <Button size={'sm'} variant='outline' colorScheme='blue'>
              Details
            </Button>
          </Skeleton>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Loading;
