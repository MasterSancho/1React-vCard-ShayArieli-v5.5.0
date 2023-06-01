import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from '../components/Spinner';
import Divider from '../components/Divider';
import SharePage from '../components/SharePage';
import BackPrevPage from '../components/BackPrevPage';
import { FaPhone } from 'react-icons/fa';
import styles from '../style/pages/Listing.module.css';

const Listing = () => {
 const [listing, setListing] = useState(null);
 const [loading, setLoading] = useState(true);
 const [show, setShow] = useState(false);
 const [selectedImage, setSelectedImage] = useState(null);

 const handleShow = (image) => {
  setSelectedImage(image);
  setShow(true);
 };

 const handleClose = () => setShow(false);

 const navigate = useNavigate();
 const params = useParams();

 useEffect(() => {
  const fetchListing = async () => {
   const docRef = doc(db, 'listings', params.listingId);
   const docSnap = await getDoc(docRef);

   if (docSnap.exists()) {
    setListing(docSnap.data());
    setLoading(false);
   }
  };

  fetchListing();
 }, [navigate, params.listingId]);

 if (loading) {
  return <Spinner />;
 }

 const { homeNumber, street, city } = listing;
 let googleMapsUrl =
  'https://www.google.com/maps/embed/v1/place?key=AIzaSyCNYRiNeUGODLoFznmHcdv9fGloz06EuLI';

 if (homeNumber > 0 && street && city) {
  googleMapsUrl += `&q=${homeNumber}+${street.split(' ').join('+')},${city
   .split(' ')
   .join('+')}+israel&zoom=16`;
 } else if (street && city) {
  googleMapsUrl += `&q=${street.split(' ').join('+')},${city
   .split(' ')
   .join('+')}+israel&zoom=16`;
 } else if (city) {
  googleMapsUrl += `&q=${city.split(' ').join('+')}+israel&zoom=16`;
 } else {
  googleMapsUrl += `&q=israel&zoom=16`;
 }

 return (
  <main dir='rtl'>
   <BackPrevPage />
   <SharePage />

   {listing.imgUrls.length > 0 ? (
    <Carousel className={styles.carousel} controls={true} fade>
     {listing.imgUrls.map((imgUrl, index) => (
      <Carousel.Item key={index} interval={3000} style={{ height: '300px' }}>
       <img
        src={imgUrl}
        className={styles.images}
        alt=''
        onClick={() => handleShow(imgUrl)}
        style={{ cursor: 'pointer' }}
       />
      </Carousel.Item>
     ))}
    </Carousel>
   ) : (
    <></>
   )}

   <div className={styles.listingDetails}>
    <p className={styles.listingName}>{listing.propertyType}</p>

    <div className={styles.textCenter}>
     <span className={styles.listingType}>
      {listing.type === 'rent' ? 'להשכרה' : 'למכירה'}
     </span>

     {listing.price > 0 ? (
      <p className={styles.listingPrice}>
       ₪{listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
       {listing.type === 'rent' && ' / לחודש'}
      </p>
     ) : (
      <p className={styles.listingPrice}>תתקשר לקבל פרטים</p>
     )}
    </div>

    <p className={styles.listingAddress}>{listing.address}</p>

    <ul className={styles.listingDetailsList}>
     <li>
      {listing.bedrooms > 0 && (
       <span className={styles.listingDesc}>
        {listing.bedrooms > 1 ? `${listing.bedrooms} חדרים` : '1 חדר'}
       </span>
      )}
     </li>

     {listing.propertyType !== 'בית פרטי' &&
     listing.propertyType !== 'דו משפחתי' ? (
      <>
       <li>
        {listing.floor && listing.floors ? (
         <span className={styles.listingDesc}>
          קומה: {listing.floor} מתוך {listing.floors}
         </span>
        ) : null}

        {listing.groundFloor && listing.floors ? (
         <span className={styles.listingDesc}>
          קומת קרקע {listing.groundFloor} מתוך {listing.floors}
         </span>
        ) : null}
       </li>
      </>
     ) : null}

     <li>
      {listing.meter > 0 && (
       <span className={styles.listingDesc}>
        {listing.meter > 1 ? `${listing.meter} מטר בנוי` : '1 מטר בנוי'}
       </span>
      )}

      {listing.gardenMeter > 0 && (
       <span className={styles.listingDesc}>
        {listing.gardenMeter > 1
         ? `${listing.gardenMeter} מטר גינה`
         : '1 מטר גינה '}
       </span>
      )}

      {listing.areaMeter > 0 && (
       <span className={styles.listingDesc}>
        {listing.areaMeter > 1 ? `${listing.areaMeter} מטר מגרש` : '1 מטר מגרש'}
       </span>
      )}
     </li>

     <li>
      {listing.bathrooms > 0 && (
       <span className={styles.listingDesc}>
        {listing.bathrooms > 1 ? `${listing.bathrooms} מקלחות` : '1 מקלחת'}
       </span>
      )}

      {listing.toilet > 0 && (
       <span className={styles.listingDesc}>
        {listing.toilet > 1 ? `${listing.toilet} שירותים` : '1 שירותים'}
       </span>
      )}
     </li>

     <li>
      {listing.parking && <span className={styles.listingDesc}>חניה</span>}
      {listing.balcony && <span className={styles.listingDesc}>מרפסת</span>}
      {listing.elevator ? (
       <span className={styles.listingDesc}>מעלית</span>
      ) : null}
     </li>
    </ul>

    {listing.description && (
     <div>
      <p className={styles.descTitile}>תיאור הנכס</p>
      <p className={styles.descText}>{listing.description}</p>
     </div>
    )}

    <p className={styles.locationText}>מיקום הנכס</p>

    <iframe
     className={styles.googleMap}
     loading='lazy'
     allowFullScreen={true}
     referrerPolicy='no-referrer-when-downgrade'
     src={googleMapsUrl}
     title='Google Map'></iframe>

    <a href='tel:0547537573' className={styles.primaryButton}>
     <span className={styles.marginLeft}> להיתקשר לסוכן</span>{' '}
     <FaPhone fill='red' size={26} />{' '}
    </a>
    <Divider />
   </div>

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
  </main>
 );
};

export default Listing;
