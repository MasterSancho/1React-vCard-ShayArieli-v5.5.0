import { useNavigate } from 'react-router-dom';
import { FaBackward } from 'react-icons/fa';
import styles from '../style/components/BackPrevPage.module.css';

const BackPrevPage = () => {
 const navigate = useNavigate();

 return (
  <div>
   <div className={styles.backIcon} onClick={() => navigate(-1)}>
    <FaBackward fill='red' size={30} />
   </div>
  </div>
 );
};

export default BackPrevPage;
