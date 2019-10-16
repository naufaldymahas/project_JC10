import React, {useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'

// var slideIndex = 1;
// showSlides(slideIndex);

// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   var i;
//   var slides = document.getElementsByClassName("mySlides");
//   var dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}    
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";  
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";  
//   dots[slideIndex-1].className += " active";
// }

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