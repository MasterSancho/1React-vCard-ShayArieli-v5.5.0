import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import styles from '../style/components/SlideshowRecom.module.css';

const SlideshowRecom = () => {
 const recommendationPath =
  process.env.PUBLIC_URL + '/assets/recommendation_images/';
 const recommendationImages = [
  'recom-001.jpeg',
  'recom-002.jpeg',
  'recom-003.jpeg',
  'recom-004.jpeg',
  'recom-005.jpeg',
  'recom-006.jpeg',
  'recom-007.jpeg',
  'recom-008.jpeg',
  'recom-009.jpeg',
  'recom-010.jpeg',
  'recom-011.jpeg',
  'recom-012.jpeg',
  'recom-013.jpeg',
  'recom-014.jpeg',
  'recom-015.jpeg',
  'recom-017.jpeg',
 ];

 const [show, setShow] = useState(false);
 const [selectedImage, setSelectedImage] = useState(null);

 const handleShow = (image) => {
  setSelectedImage(image);
  setShow(true);
 };

 const handleClose = () => setShow(false);

 return (
  <>
   <h2 className={styles.textWhite}>לקוחות ממליצים</h2>
   <Carousel controls={true} fade className={styles.carousel}>
    {recommendationImages.map((image, index) => (
     <Carousel.Item key={index} interval={3000}>
      <div className={styles.carouselItemDiv}>
       <img
        className={styles.carouselItemImage}
        src={recommendationPath + image}
        alt='Gallery Image'
        onClick={() => handleShow(recommendationPath + image)}
        style={{ cursor: 'pointer' }}
       />
      </div>
     </Carousel.Item>
    ))}
   </Carousel>

   <Modal show={show} onHide={handleClose}>
    <Modal.Header className='imgModal' closeButton></Modal.Header>
    <Modal.Body className='imgModal'>
     <img src={selectedImage} className='img-fluid' alt='Selected' />
    </Modal.Body>
    <Modal.Footer className='imgModal'>
     <Button variant='secondary' onClick={handleClose}>
      סגור
     </Button>
    </Modal.Footer>
   </Modal>
  </>
 );
};

export default SlideshowRecom;
