import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
 getStorage,
 ref,
 uploadBytesResumable,
 getDownloadURL,
} from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import Spinner from '../components/Spinner';
import Divider from '../components/Divider';
import BackPrevPage from '../components/BackPrevPage';
import styles from '../style/pages/CreateListing.module.css';

const CreateListing = () => {
 const [loading, setLoading] = useState(false);
 const [formData, setFormData] = useState({
  propertyType: 'דירה',
  type: 'sale',
  bedrooms: 0,
  bathrooms: 0,
  parking: false,
  elevator: false,
  balcony: false,
  address: '',
  meter: 0,
  areaMeter: 0,
  gardenMeter: 0,
  price: 0,
  groundFloor: false,
  floor: 0,
  floors: 0,
  toilet: 0,
  images: {},
  city: '',
  neighborhood: '',
  street: '',
  homeNumber: 0,
  description: '',
 });

 const [thumbnails, setThumbnails] = useState({
  image1: null,
  image2: null,
  image3: null,
  image4: null,
  image5: null,
 });

 const { image1, image2, image3, image4, image5 } = thumbnails;

 const {
  propertyType,
  type,
  bedrooms,
  bathrooms,
  parking,
  elevator,
  balcony,
  meter,
  areaMeter,
  gardenMeter,
  price,
  groundFloor,
  floor,
  floors,
  toilet,
  city,
  neighborhood,
  street,
  homeNumber,
  description,
 } = formData;

 // useEffect to set form data
 useEffect(() => {
  let address = `${city} ${neighborhood} ${street}`;
  if (homeNumber > 0) {
   address += ` ${homeNumber}`;
  }

  setFormData((prevFormData) => ({
   ...prevFormData,
   images: {
    image1,
    image2,
    image3,
    image4,
    image5,
   },
   address,
  }));
 }, [
  image1,
  image2,
  image3,
  image4,
  image5,
  city,
  neighborhood,
  street,
  homeNumber,
 ]);

 const auth = getAuth();
 const navigate = useNavigate();
 const isMounted = useRef(true);

 // Render input with thumbnail
 const renderInputWithThumbnail = (files) => (
  <div className={styles.inputThumbnailWrapper}>
   <input
    className={styles.formInputFile}
    type='file'
    id={files}
    onChange={onMutate}
    max='5'
    accept='.jpg,.png,.jpeg'
   />
   {thumbnails[files] && (
    <img
     className={styles.thumbnail}
     src={thumbnails[files]}
     alt='Selected thumbnail'
    />
   )}
  </div>
 );

 //useEffect
 useEffect(() => {
  if (isMounted) {
   onAuthStateChanged(auth, (user) => {
    if (user) {
     setFormData({ ...formData, userRef: user.uid });
    } else {
     navigate('/sign-in');
    }
   });
  }

  return () => {
   isMounted.current = false;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [isMounted]);

 // onSubmit
 const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Store images in Firebase Storage
  const storeImage = async (image) => {
   return new Promise((resolve, reject) => {
    const storage = getStorage();
    const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

    const storageRef = ref(storage, `images/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
     'state_changed',
     (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
       case 'paused':
        console.log('Upload is paused');
        break;
       case 'running':
        console.log('Upload is running');
        break;
       default:
        break;
      }
     },
     (error) => {
      reject(error);
     },
     () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       resolve(downloadURL);
      });
     }
    );
   });
  };

  // Filter out null values from thumbnails and convert them to File objects
  const imagesToUpload = Object.values(thumbnails)
   .filter((thumbnail) => thumbnail !== null)
   .map((thumbnail) => {
    const [header, base64Image] = thumbnail.split(',');
    const mimeType = header.match(/:(.*?);/)[1];
    const imageData = atob(base64Image);
    const arraybuffer = new ArrayBuffer(imageData.length);
    const view = new Uint8Array(arraybuffer);
    for (let i = 0; i < imageData.length; i++) {
     view[i] = imageData.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([arraybuffer], { type: mimeType });
    const file = new File([blob], `${uuidv4()}.jpeg`, { type: mimeType });
    return file;
   });

  const imgUrls = await Promise.all(
   imagesToUpload.map((image) => storeImage(image))
  ).catch(() => {
   setLoading(false);
   toast.error('תמונות לא הועלו');
   return;
  });

  const formDataCopy = {
   ...formData,
   imgUrls,
   timestamp: serverTimestamp(),
  };

  // Remove the images object from formDataCopy
  delete formDataCopy.images;

  // Upload listing
  const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
  setLoading(false);
  toast.success('נכס שמור בהצלחה');
  navigate(`/category/${formDataCopy.type}/${docRef.id}`);
 };

 /// onMutate function
 const onMutate = (e) => {
  const { id, value, type } = e.target;

  // File input
  if (type === 'file') {
   const file = e.target.files[0];

   if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
     setThumbnails((prevThumbnails) => ({
      ...prevThumbnails,
      [id]: reader.result,
     }));
    };
    reader.readAsDataURL(file);
   } else {
    setThumbnails((prevThumbnails) => ({
     ...prevThumbnails,
     [id]: null,
    }));
   }
  }
  // Button input
  else if (type === 'button') {
   e.preventDefault();

   if (id === 'type') {
    setFormData((prevFormData) => ({
     ...prevFormData,
     [id]: value,
    }));
   } else {
    const boolValue = value === 'true';
    setFormData((prevFormData) => ({
     ...prevFormData,
     [id]: boolValue,
    }));
   }
  }
  // Text and number input
  else {
   const parsedValue = type === 'number' ? parseInt(value, 10) : value;
   setFormData((prevFormData) => ({
    ...prevFormData,
    [id]: parsedValue,
   }));
  }
 };

 if (loading) {
  return <Spinner />;
 }

 return (
  <div className={styles.profile}>
   <BackPrevPage />

   <header>
    <p className={styles.pageHeader}>ליצור נכס</p>
   </header>

   <main dir='rtl'>
    <form onSubmit={onSubmit}>
     <label className={styles.formLabel}>מכירה / השכרה</label>
     <div className={styles.formButtons}>
      <button
       type='button'
       className={type === 'sale' ? styles.formButtonActive : styles.formButton}
       id='type'
       value='sale'
       onClick={onMutate}>
       מכירה
      </button>

      <button
       type='button'
       className={type === 'rent' ? styles.formButtonActive : styles.formButton}
       id='type'
       value='rent'
       onClick={onMutate}>
       השכרה
      </button>
     </div>

     <label className={styles.formLabel}>סוג הנכס</label>
     <Form.Select
      className={styles.formInputSelect}
      id='propertyType'
      value={propertyType}
      onChange={onMutate}>
      <option className={styles.formInputOption} value='דירה'>
       דירה
      </option>
      <option className={styles.formInputOption} value='דירת גן'>
       דירת גן
      </option>
      <option className={styles.formInputOption} value='פנטהאוז'>
       פנטהאוז
      </option>
      <option className={styles.formInputOption} value='דופלקס'>
       דופלקס
      </option>
      <option className={styles.formInputOption} value='סטודיו'>
       סטודיו
      </option>
      <option className={styles.formInputOption} value='יחידת דיור'>
       יחידת דיור
      </option>
      <option className={styles.formInputOption} value='בית פרטי'>
       בית פרטי
      </option>
      <option className={styles.formInputOption} value='דו משפחתי'>
       דו משפחתי
      </option>
      <option className={styles.formInputOption} value='משק חקלאי'>
       משק חקלאי
      </option>
      <option className={styles.formInputOption} value='מגרש'>
       מגרש
      </option>
     </Form.Select>

     <label className={styles.formLabel}>עיר</label>
     <input
      className={styles.formInputName}
      type='text'
      id='city'
      value={city}
      onChange={onMutate}
      maxLength='16'
      minLength='2'
      required
     />

     <label className={styles.formLabel}>שכונה</label>
     <input
      className={styles.formInputName}
      type='text'
      id='neighborhood'
      value={neighborhood}
      onChange={onMutate}
      maxLength='16'
      minLength='2'
     />

     <div className={styles.flex}>
      <div>
       <label className={styles.formLabel}>רחוב</label>
       <input
        className={styles.formInputName}
        type='text'
        id='street'
        value={street}
        onChange={onMutate}
        maxLength='16'
        minLength='2'
       />
      </div>

      <div>
       <label className={styles.formLabel}>מספר בית</label>
       <input
        className={styles.formInputSmallNumber}
        type='number'
        id='homeNumber'
        value={homeNumber}
        onChange={onMutate}
        min='0'
        max='999'
       />
      </div>
     </div>

     <label className={styles.formLabel}>שטח בנוי</label>
     <div className={styles.formInputNum}>
      <input
       className={styles.formInputSmall}
       type='number'
       id='meter'
       value={meter}
       onChange={onMutate}
       min='0'
       max='750000000'
      />
      <p className={styles.nameOfValue}> / מ"ר</p>
     </div>

     {propertyType === 'דירת גן' ? (
      <>
       <label className={styles.formLabel}>שטח גינה</label>
       <div className={styles.formInputNum}>
        <input
         className={styles.formInputSmall}
         type='number'
         id='gardenMeter'
         value={gardenMeter}
         onChange={onMutate}
         min='0'
         max='750000000'
        />
        <p className={styles.nameOfValue}> / מ"ר</p>
       </div>
      </>
     ) : null}

     {propertyType === 'בית פרטי' ||
     propertyType === 'דו משפחתי' ||
     propertyType === 'מגרש' ? (
      <>
       <label className={styles.formLabel}>שטח מגרש</label>
       <div className={styles.formInputNum}>
        <input
         className={styles.formInputSmall}
         type='number'
         id='areaMeter'
         value={areaMeter}
         onChange={onMutate}
         min='0'
         max='750000000'
        />
        <p className={styles.nameOfValue}> / מ"ר</p>
       </div>
      </>
     ) : null}

     <label className={styles.formLabel}>קומת קרקע</label>
     <div className={styles.formButtons}>
      <button
       className={groundFloor ? styles.formButtonActive : styles.formButton}
       type='button'
       id='groundFloor'
       value={true}
       onClick={onMutate}>
       כן
      </button>

      <button
       className={
        !groundFloor && groundFloor !== null
         ? styles.formButtonActive
         : styles.formButton
       }
       type='button'
       id='groundFloor'
       value={false}
       onClick={onMutate}>
       לא
      </button>

      {groundFloor ? (
       <>
        <label className={styles.groundFloorsLabel}>
         <span style={{ marginRight: '-4rem' }}>מתוך</span> קומות
        </label>
        <input
         className={styles.groundFloorsInput}
         type='number'
         id='floors'
         value={floors}
         onChange={onMutate}
         min='0'
         max='50'
        />
       </>
      ) : null}
     </div>

     {!groundFloor ? (
      <div className={styles.flex}>
       <div>
        <label className={styles.formLabel}>קומה</label>
        <input
         className={styles.formInputSmallDouble}
         type='number'
         id='floor'
         value={floor}
         onChange={onMutate}
         min='0'
         max='50'
        />
       </div>

       <div>
        <label className={styles.formLabel}>
         <span style={{ marginRight: '-3rem' }}>מתוך</span> קומות
        </label>
        <input
         className={styles.formInputSmallDouble}
         type='number'
         id='floors'
         value={floors}
         onChange={onMutate}
         min='0'
         max='50'
        />
       </div>
      </div>
     ) : null}

     <div className={styles.flex}>
      <div>
       <label className={styles.formLabel}>חדרים</label>
       <input
        className={styles.formInputSmallTriple}
        type='number'
        id='bedrooms'
        value={bedrooms}
        onChange={onMutate}
        min='0'
        max='50'
        required
       />
      </div>

      <div>
       <label className={styles.formLabel}>מקלחת</label>
       <input
        className={styles.formInputSmallTriple}
        type='number'
        id='bathrooms'
        value={bathrooms}
        onChange={onMutate}
        min='0'
        max='50'
       />
      </div>

      <div>
       <label className={styles.formLabel}>שירותים</label>
       <input
        className={styles.formInputSmallTriple}
        type='number'
        id='toilet'
        value={toilet}
        onChange={onMutate}
        min='0'
        max='50'
       />
      </div>
     </div>

     <label className={styles.formLabel}>חניה</label>
     <div className={styles.formButtons}>
      <button
       className={parking ? styles.formButtonActive : styles.formButton}
       type='button'
       id='parking'
       value={true}
       onClick={onMutate}>
       יש
      </button>

      <button
       className={
        !parking && parking !== null
         ? styles.formButtonActive
         : styles.formButton
       }
       type='button'
       id='parking'
       value={false}
       onClick={onMutate}>
       אין
      </button>
     </div>

     <label className={styles.formLabel}>מעלית</label>
     <div className={styles.formButtons}>
      <button
       className={elevator ? styles.formButtonActive : styles.formButton}
       type='button'
       id='elevator'
       value={true}
       onClick={onMutate}>
       יש
      </button>

      <button
       className={
        !elevator && elevator !== null
         ? styles.formButtonActive
         : styles.formButton
       }
       type='button'
       id='elevator'
       value={false}
       onClick={onMutate}>
       אין
      </button>
     </div>

     <label className={styles.formLabel}>מרפסת</label>
     <div className={styles.formButtons}>
      <button
       className={balcony ? styles.formButtonActive : styles.formButton}
       type='button'
       id='balcony'
       value={true}
       onClick={onMutate}>
       יש
      </button>

      <button
       className={
        !balcony && balcony !== null
         ? styles.formButtonActive
         : styles.formButton
       }
       type='button'
       id='balcony'
       value={false}
       onClick={onMutate}>
       אין
      </button>
     </div>

     <label className={styles.formLabel}>מחיר</label>
     <div className={styles.formInputNum}>
      <input
       className={styles.formInputSmall}
       type='number'
       id='price'
       value={price}
       onChange={onMutate}
       min='0'
       max='750000000'
      />
      {type === 'rent' && <p className={styles.nameOfValue}>₪ / חודש</p>}
     </div>

     <label className={styles.formLabel}>תיאור הנכס</label>
     <textarea
      className={styles.formInputDescription}
      type='text'
      id='description'
      value={description}
      onChange={onMutate}
     />

     <label className={styles.formLabel}>תמונות</label>
     <p className={styles.imagesInfo}>
      תמונה ראשונה תיהי תמונה ראשית (מקס 5 תמונות).
     </p>
     <div className={styles.formInputFileDiv}>
      {renderInputWithThumbnail('image1')}
      {renderInputWithThumbnail('image2')}
      {renderInputWithThumbnail('image3')}
      {renderInputWithThumbnail('image4')}
      {renderInputWithThumbnail('image5')}
     </div>
     <button type='submit' className={styles.createListingButton}>
      שמור נכס
     </button>
    </form>
    <Divider />
   </main>
  </div>
 );
};

export default CreateListing;
