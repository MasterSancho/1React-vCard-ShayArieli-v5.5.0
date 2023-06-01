import { FaEnvelope, FaSms, FaWhatsapp, FaFacebook } from 'react-icons/fa';
import styles from '../style/components/ShareLinks.module.css';

const ShareLinks = ({ data }) => {
 const shareOnMail = () => {
  const mail = `mailto:?subject=כרטיס ביקור של שי אריאלי - מנהל מכירה&body=${window.location.href}`;
  return mail;
 };
 const shareOnWhatsapp = () => {
  const whatsapp = `https://api.whatsapp.com/send?text=${window.location.href}%0A%0A`;
  return whatsapp;
 };
 const shareOnFacebook = () => {
  const facebook = `https://www.facebook.com/sharer.php?u=${window.location.href}`;
  return facebook;
 };
 const shareOnSms = () => {
  const sms = `sms://?&body=כרטיס ביקור של שי אריאלי - מנהל מכירה ${window.location.href} %0A%0A`;
  return sms;
 };

 return (
  <div className={styles.shareLinks}>
   <h2>שתפו כרטיס ביקור</h2>
   <div className='row'>
    <div className='col'>
     <a href={shareOnMail()}>
      <FaEnvelope fill='#dc3545' size={30} />
     </a>
    </div>

    <div className='col'>
     <a href={shareOnSms()}>
      <FaSms fill='#dc3545' size={30} />
     </a>
    </div>

    <div className='col'>
     <a href={shareOnWhatsapp()}>
      <FaWhatsapp fill='#dc3545' size={30} />
     </a>
    </div>

    <div className='col'>
     <a href={shareOnFacebook()}>
      <FaFacebook fill='#dc3545' size={30} />
     </a>
    </div>
   </div>
  </div>
 );
};

export default ShareLinks;
