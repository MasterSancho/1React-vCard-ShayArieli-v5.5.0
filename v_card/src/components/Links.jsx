import { Link } from 'react-router-dom';
import {
 FaPhone,
 FaWhatsapp,
 FaFacebook,
 FaHome,
 FaEnvelope,
 FaChrome,
 FaBlackTie,
 FaListUl,
} from 'react-icons/fa';
import styles from '../style/components/Links.module.css';

const Links = () => {
 return (
  <div className={styles.links}>
   <div className={`row ${styles.linksRow}`}>
    <div className='col'>
     <a href='mailto:arielishai@gmail.com'>
      <FaEnvelope fill='#dc3545' size={30} />
     </a>
     <p>מייל</p>
    </div>

    <div className='col'>
     <a
      href='https://api.whatsapp.com/send?phone=9720547537573'
      aria-label='write to whatsapp'>
      <FaWhatsapp fill='#dc3545' size={30} />
     </a>
     <p>וואטסאפ</p>
    </div>

    <div className='col'>
     <a href='tel:0547537573' aria-label='call on mobile'>
      <FaPhone fill='#dc3545' size={30} />
     </a>
     <p>חייג אלי</p>
    </div>
   </div>

   <div className={`row ${styles.linksRow}`}>
    <div className='col'>
     <Link to='/reference' aria-label='go to reference page'>
      <FaChrome fill='#dc3545' size={30} />
      <p>אתרי עזר</p>
     </Link>
    </div>

    <div className='col'>
     <a href='https://arieli-shaii.web.app/explore' aria-label='go to listings'>
      <FaHome fill='#dc3545' size={30} />
     </a>
     <p>מאגר נכסים</p>
    </div>

    <div className='col'>
     <a
      href='https://www.facebook.com/shaiarieliremax'
      aria-label='go to facebook'>
      <FaFacebook fill='#dc3545' size={30} />
     </a>
     <p>פייסבוק</p>
    </div>
   </div>

   <div className={`row ${styles.linksRow}`}>
    <div className='col'>
     <a
      href='https://www.bizreviews.co.il/provider/arieli-shai'
      aria-label='go to biz recommendation'>
      <FaListUl fill='#dc3545' size={30} />
     </a>
     <p>ביז חוות דעת</p>
    </div>

    <div className='col'>
     <a
      href='https://theselected.walla.co.il/item/3405214'
      aria-label='go to newspaper recommendation'>
      <FaChrome fill='#dc3545' size={30} />
     </a>
     <p>מן העיתונות</p>
    </div>

    <div className='col'>
     <a href='http://bit.ly/3I2LBQ1' aria-label='go to profesionals web'>
      <FaBlackTie fill='#dc3545' size={30} />
     </a>
     <p>אתר המקצוענים</p>
    </div>
   </div>
  </div>
 );
};

export default Links;
