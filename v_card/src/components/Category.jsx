import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
 collection,
 getDocs,
 query,
 where,
 orderBy,
 limit,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from './ListingItem';
import Divider from './Divider';
import SharePage from './SharePage';
import BackPrevPage from './BackPrevPage';
import styles from '../style/components/Category.module.css';

const Category = () => {
 const [listings, setListings] = useState(null);
 const [loading, setLoading] = useState(true);

 const params = useParams();

 useEffect(() => {
  const fetchListings = async () => {
   try {
    // Get reference
    const listingsRef = collection(db, 'listings');

    // Create a query
    const q = query(
     listingsRef,
     where('type', '==', params.categoryName),
     orderBy('address', 'asc'),
     limit(30)
    );

    // Execute query
    const querySnap = await getDocs(q);

    const listings = [];

    querySnap.forEach((doc) => {
     return listings.push({
      id: doc.id,
      data: doc.data(),
     });
    });

    setListings(listings);
    setLoading(false);
   } catch (error) {
    toast.error('לא ניתן להציג נכסים');
   }
  };

  fetchListings();
 }, [params.categoryName]);

 return (
  <div className={styles.category}>
   <BackPrevPage />
   <SharePage />

   <p className={styles.headerPage}>
    {params.categoryName === 'rent' ? 'נכסים להשכרה' : 'נכסים למכירה'}
   </p>

   {loading ? (
    <Spinner />
   ) : listings && listings.length > 0 ? (
    <ul className={styles.mainUl}>
     {listings.map((listing) => (
      <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
     ))}
    </ul>
   ) : (
    <p className={styles.divPage}>
     אין נכסים {params.categoryName === 'rent' ? 'להשכרה' : 'למכירה'}
    </p>
   )}
   <Divider />
  </div>
 );
};

export default Category;
