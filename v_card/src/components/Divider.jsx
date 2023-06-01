import styles from '../style/components/Divider.module.css';
import logo from '../assets/logo_NoBg.png';

const Divider = () => {
 return (
  <div className={`row ${styles.div}`}>
   <div className='col'>
    <hr className={styles.hr} />
   </div>

   <div className='col'>
    <img src={logo} alt='תמונת לוגו' width={100} />
   </div>

   <div className='col'>
    <hr className={styles.hr} />
   </div>
  </div>
 );
};

export default Divider;
