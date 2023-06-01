import styles from '../style/components/SharePage.module.css';
import { FaShare } from 'react-icons/fa';

const SharePage = () => {
 const getWhatsAppUrl = () => {
  const url = `https://api.whatsapp.com/send?text=%0A${window.location.href}%0A%0A`;
  return url;
 };

 return (
  <div>
   <div className={styles.shareIcon}>
    <a href={getWhatsAppUrl()}>
     <FaShare fill='red' size={30} />
    </a>
   </div>
  </div>
 );
};

export default SharePage;
