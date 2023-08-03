import { Box, Image } from '@chakra-ui/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import carousel1 from '../../assets/img/carousel-1.png'
import carousel2 from '../../assets/img/carousel-2.png'
const Carousel = () => {
  return (
    <Box>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}>
        <SwiperSlide>
          <Image
            width={'100%'}
            height={{ base: '20vh', md: '60vh' }}
            src={carousel1}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            width={'100%'}
            height={{ base: '20vh', md: '60vh' }}
            src={carousel2}
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  )
}

export default Carousel
