import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { FaChevronRight } from 'react-icons/fa';
import styles from '../style/pages/ForgotPassword.module.css';

const ForgotPassword = () => {
 const [email, setEmail] = useState('');

 const onChange = (e) => setEmail(e.target.value);

 const onSubmit = async (e) => {
  e.preventDefault();
  try {
   const auth = getAuth();
   await sendPasswordResetEmail(auth, email);
   toast.success('איפוס קישור נשלח למייל שלך');
  } catch (error) {
   toast.error('לא ניתן לשלוח קישור לאיפוס');
  }
 };

 return (
  <div className={styles.pageContainer}>
   <header>
    <p className={styles.pageHeader}>שכחת את הסיסמא</p>
   </header>

   <main>
    <form onSubmit={onSubmit}>
     <input
      type='email'
      className={styles.emailInput}
      placeholder='Email'
      id='email'
      value={email}
      onChange={onChange}
     />

     <div dir='rtl'>
      <Link className={styles.forgotPasswordLink} to='/sign-in'>
       להתחבר
      </Link>

      <div className={styles.signInBar}>
       <p className={styles.signInText}>שלח קישור לאיפוס</p>
       <button className={styles.signInButton}>
        <FaChevronRight fill='#ffffff' width='34px' height='34px' />
       </button>
      </div>
     </div>
    </form>
   </main>
  </div>
 );
};

export default ForgotPassword;
