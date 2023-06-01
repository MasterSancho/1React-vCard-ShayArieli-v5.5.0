import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';
import Divider from '../components/Divider';
import SharePage from '../components/SharePage';
import BackPrevPage from '../components/BackPrevPage';
import styles from '../style/pages/Explore.module.css';

const Explore = () => {
 const [listings, setListings] = useState(null);
 const [loading, setLoading] = useState(true);

 const params = useParams();

 useEffect(() => {
  const fetchListings = async () => {
   try {
    // Get reference
    const listingsRef = collection(db, 'listings');

    // Create a query
    const q = query(listingsRef, orderBy('address', 'asc'), limit(30));

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
 }, [params]);

 return (
  <div className={styles.explore}>
   <BackPrevPage />
   <SharePage />

   <div className={styles.exploreCategories}>
    <Link to='/category/rent'>
     <p className={styles.exploreCategoryName}>נכסים להשכרה</p>
    </Link>
    <Link to='/category/sale'>
     <p className={styles.exploreCategoryName}>נכסים למכירה</p>
    </Link>
   </div>

   {loading ? (
    <Spinner />
   ) : listings && listings.length > 0 ? (
    <>
     <main>
      <p className={styles.allCategories}>כל הנכסים</p>
      <ul className={styles.categoryListings}>
       {listings.map((listing) => (
        <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
       ))}
      </ul>
      <Divider />
     </main>
    </>
   ) : (
    <p className={styles.textCenter}>אין נכסים{params.categoryName}</p>
   )}
  </div>
 );
};

export default Explore;
