import React, {useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'

const LandingPage = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    // const [image, setImage] = useState([])

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };

  return (
    <div className="mx-auto mb-4" style={{width: 900}}>
    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
      <Carousel.Item style={{ height: "400px" }}>
        <img
          className="d-block h-100"
          src={require('../../assets/banner1.jpg')}
          alt="First slide"
        />

      </Carousel.Item>
      <Carousel.Item style={{ height: "400px" }}>
        <img
          className="d-block h-100"
          src={require('../../assets/banner2.jpg')}
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item style={{ height: "400px" }}>
        <img
          className="d-block h-100"
          src={require('../../assets/banner3.jpg')}
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default LandingPage