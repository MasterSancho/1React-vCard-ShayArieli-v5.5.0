import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
 getAuth,
 createUserWithEmailAndPassword,
 updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { FaChevronRight } from 'react-icons/fa';
import styles from '../style/pages/SignUp.module.css';
import visiblityIcon from '../assets/svg/visibilityIcon.svg';

const SignUp = () => {
 const [showPassword, setShowPassword] = useState(false);
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
 });
 const { name, email, password } = formData;

 const navigate = useNavigate();

 const onChange = (e) => {
  setFormData((prevState) => ({
   ...prevState,
   [e.target.id]: e.target.value,
  }));
 };

 const onSubmit = async (e) => {
  e.preventDefault();

  try {
   const auth = getAuth();

   const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
   );

   const user = userCredential.user;

   updateProfile(auth.currentUser, {
    displayName: name,
   });

   const formDataCopy = { ...formData };
   delete formDataCopy.password;
   formDataCopy.timestamp = serverTimestamp();

   await setDoc(doc(db, 'users', user.uid), formDataCopy);

   navigate('/profile');
  } catch (error) {
   toast.error('לא ניתן להירשם');
  }
 };

 return (
  <>
   <div className={styles.pageContainer}>
    <header>
     <p dir='rtl' className={styles.pageHeader}>
      ברוך הבא!
     </p>
    </header>

    <form onSubmit={onSubmit}>
     <input
      type='text'
      className={styles.nameInput}
      placeholder='Name'
      id='name'
      value={name}
      onChange={onChange}
     />

     <input
      type='email'
      className={styles.emailInput}
      placeholder='Email'
      id='email'
      value={email}
      onChange={onChange}
     />

     <div className={styles.positionRelative}>
      <input
       type={showPassword ? 'text' : 'password'}
       className={styles.passwordInput}
       placeholder='Password'
       id='password'
       value={password}
       onChange={onChange}
      />

      <img
       src={visiblityIcon}
       alt='show password'
       className={styles.showPassword}
       onClick={() => setShowPassword((prevState) => !prevState)}
      />
     </div>

     <div dir='rtl' className={styles.signUpBar}>
      <p className={styles.signUpText}>להירשם</p>
      <button className={styles.signUpButton}>
       <FaChevronRight fill='#ffffff' width='34px' height='34px' />
      </button>
     </div>
    </form>
   </div>
  </>
 );
};

export default SignUp;
