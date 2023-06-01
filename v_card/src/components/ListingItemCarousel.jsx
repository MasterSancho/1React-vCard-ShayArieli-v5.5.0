import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import Carousel from 'react-bootstrap/Carousel';
import Spinner from './Spinner';
import ListingItem from './ListingItem';
import styles from '../style/components/ListingItemCarousel.module.css';

const ListingItemCarousel = () => {
 const [loading, setLoading] = useState(true);
 const [listings, setListings] = useState(null);

 const navigate = useNavigate();

 useEffect(() => {
  const fetchListings = async () => {
   const listingsRef = collection(db, 'listings');
   const q = query(listingsRef, orderBy('address', 'asc'), limit(30));
   const querySnap = await getDocs(q);

   let listings = [];

   querySnap.forEach((doc) => {
    return listings.push({
     id: doc.id,
     data: doc.data(),
    });
   });

   setListings(listings);
   setLoading(false);
  };

  fetchListings();
 }, []);

 if (loading) {
  return <Spinner />;
 }

 if (listings.length === 0) {
  return <></>;
 }

 return (
  listings && (
   <>
    <h2 className={styles.textWhite}>מאגר נכסים</h2>
    <Carousel controls={true} fade>
     {listings
      .filter(({ data }) => data.imgUrls && data.imgUrls.length > 0)
      .map(({ data, id }) => (
       <Carousel.Item
        className={styles.carouselItem}
        key={id}
        interval={5000}
        onClick={() => navigate(`/category/${data.type}/${id}`)}>
        <ListingItem listing={data} id={id} />
       </Carousel.Item>
      ))}
    </Carousel>
   </>
  )
 );
};

export default ListingItemCarousel;
