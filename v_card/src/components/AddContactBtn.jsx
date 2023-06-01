import { FaUserPlus } from 'react-icons/fa';
import styles from '../style/components/AddContactBtn.module.css';

const AddContactBtn = () => {
 return (
  <a href='/assets/שי אריאלי - מנהל מכירה.vcf' className={styles.addContact}>
   <FaUserPlus fill='#dc3545' size={25} />{' '}
   <span className={styles.span}> שמור אותי באנשי הקשר</span>
  </a>
 );
};

export default AddContactBtn;
