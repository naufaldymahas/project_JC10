import React, {useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'

const LandingPage = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [image, setImage] = useState([])

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };

  return (
    <div className="mx-auto mb-4" style={{width: 900}}>
    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mayvers.com.au/wp-content/uploads/2017/09/test-image.jpg"
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mayvers.com.au/wp-content/uploads/2017/09/test-image.jpg"
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mayvers.com.au/wp-content/uploads/2017/09/test-image.jpg"
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default LandingPage