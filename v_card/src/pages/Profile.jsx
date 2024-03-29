import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import {
 updateDoc,
 doc,
 collection,
 getDocs,
 query,
 where,
 orderBy,
 deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';
import { FaHome, FaPlus } from 'react-icons/fa';
import Divider from '../components/Divider';
import styles from '../style/pages/Profile.module.css';

const Profile = () => {
 const auth = getAuth();
 const [loading, setLoading] = useState(true);
 const [listings, setListings] = useState(null);
 const [changeDetails, setChangeDetails] = useState(false);
 const [formData, setFormData] = useState({
  name: auth.currentUser.displayName,
  email: auth.currentUser.email,
 });
 const { name, email } = formData;

 const navigate = useNavigate();

 useEffect(() => {
  const fetchUserListings = async () => {
   const listingsRef = collection(db, 'listings');

   const q = query(
    listingsRef,
    where('userRef', '==', auth.currentUser.uid),
    orderBy('timestamp', 'desc')
   );

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

  fetchUserListings();
 }, [auth.currentUser.uid]);

 const onLogout = () => {
  auth.signOut();
  navigate('/');
 };

 // const onSubmit = async () => {
 //  try {
 //   if (auth.currentUser.displayName !== name) {
 // Update display name in firebase
 // await updateProfile(auth.currentUser, {
 //  displayName: name,
 // });

 // Update in firestore
 //    const userRef = doc(db, 'users', auth.currentUser.uid);
 //    await updateDoc(userRef, {
 //     name,
 //    });
 //   }
 //  } catch (error) {
 //   toast.error('לא ניתן היה לעדכן את פרטי הפרופיל');
 //  }
 // };

 const onChange = (e) => {
  setFormData((prevState) => ({
   ...prevState,
   [e.target.id]: e.target.value,
  }));
 };

 const onDelete = async (listingId) => {
  if (window.confirm('אתה בטוח שאתה רוצה למחוק את הנכס?')) {
   await deleteDoc(doc(db, 'listings', listingId));
   const updatedListings = listings.filter(
    (listing) => listing.id !== listingId
   );
   setListings(updatedListings);
   toast.success('נכס נמחק בהצלחה');
  }
 };

 const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`);

 return (
  <div className={styles.profile}>
   <header dir='rtl' className={styles.header}>
    <p className={styles.pageHeader}>פרטים שלי ונכסים</p>
    <button type='button' className={styles.logOut} onClick={onLogout}>
     להתנתק
    </button>
   </header>

   <main>
    <div className={styles.profileCard}>
     <form>
      <input
       type='text'
       id='name'
       className={`${
        !changeDetails ? styles.profileName : styles.profileNameActive
       }`}
       disabled={!changeDetails}
       value={name}
       onChange={onChange}
      />

      <input
       type='email'
       id='email'
       className={`${
        !changeDetails ? styles.profileEmail : styles.profileEmailActive
       }`}
       disabled={!changeDetails}
       value={email}
       onChange={onChange}
      />
     </form>
    </div>

    <Link to='/create-listing' className={styles.createListing}>
     <FaHome fill='red' size={20} />
     <p className={styles.marginY}>הוסף נכס למכירה / להשכרה</p>
     <FaPlus fill='red' size={20} />
    </Link>

    {!loading && listings?.length > 0 && (
     <>
      <p className={styles.listingText}>נכסים שלי</p>
      <ul className={styles.listingsList}>
       {listings.map((listing) => (
        <ListingItem
         key={listing.id}
         listing={listing.data}
         id={listing.id}
         onDelete={() => onDelete(listing.id)}
         onEdit={() => onEdit(listing.id)}
        />
       ))}
      </ul>
     </>
    )}
    <Divider />
   </main>
  </div>
 );
};

export default Profile;
