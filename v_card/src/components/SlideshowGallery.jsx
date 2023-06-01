import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import styles from '../style/components/SlideshowGallery.module.css';

const SlideshowGallery = () => {
 const galleryPath = process.env.PUBLIC_URL + '/assets/gallery_images/';
 const galleryImages = [
  'gallery_001.jpeg',
  'gallery_002.jpeg',
  'gallery_003.jpeg',
  'gallery_004.jpeg',
  'gallery_005.jpeg',
  'gallery_006.jpeg',
  'gallery_007.jpeg',
  'gallery_008.jpeg',
  'gallery_009.jpeg',
  'gallery_010.jpeg',
  'gallery_011.jpeg',
  'gallery_012.jpeg',
  'gallery_013.jpeg',
  'gallery_014.jpeg',
  'gallery_015.jpeg',
  'gallery_017.jpeg',
  'gallery_018.jpeg',
  'gallery_019.jpeg',
  'gallery_020.jpeg',
  'gallery_021.jpeg',
  'gallery_022.jpeg',
  'gallery_023.jpeg',
  'gallery_024.jpeg',
  'gallery_025.jpeg',
  'gallery_026.jpeg',
  'gallery_027.jpeg',
  'gallery_028.jpeg',
  'gallery_029.jpeg',
  'gallery_030.jpeg',
  'gallery_031.jpeg',
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
   <h2 className={styles.textWhite}>גלריה תמונות</h2>
   <Carousel controls={true} fade className={styles.carousel}>
    {galleryImages.map((image, index) => (
     <Carousel.Item key={index} interval={3000} style={{ height: '200px' }}>
      <div className={styles.carouselItemDiv}>
       <img
        className={styles.carouselItemImage}
        src={galleryPath + image}
        alt=''
        onClick={() => handleShow(galleryPath + image)}
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

export default SlideshowGallery;
