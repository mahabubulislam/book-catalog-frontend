import { Box } from '@chakra-ui/react'
import Carousel from '../components/home/Carousel'
import RecentlyAdded from '../components/home/RecentlyAdded'

const Home = () => {
  return (
    <>
      <Carousel />
      <Box p={{ base: 5, lg: 16 }}>
        <RecentlyAdded />
      </Box>
    </>
  )
}

export default Home
