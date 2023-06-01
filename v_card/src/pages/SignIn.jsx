import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FaChevronRight } from 'react-icons/fa';
import styles from '../style/pages/SignIn.module.css';
import visiblityIcon from '../assets/svg/visibilityIcon.svg';

const SignIn = () => {
 const [showPassword, setShowPassword] = useState(false);
 const [formData, setFormData] = useState({
  email: '',
  password: '',
 });
 const { email, password } = formData;

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

   const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
   );

   if (userCredential.user) {
    navigate('/profile');
   }
  } catch (error) {
   toast.error('פרטים משתמש לא נכונים');
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

     <Link to='/forgot-password' className={styles.forgotPasswordLink}>
      שכחת את הסיסמא
     </Link>

     <div dir='rtl' className={styles.signInBar}>
      <p className={styles.signInText}>להתחבר</p>
      <button className={styles.signInButton}>
       <FaChevronRight fill='#ffffff' width='34px' height='34px' />
      </button>
     </div>
    </form>
   </div>
  </>
 );
};

export default SignIn;
