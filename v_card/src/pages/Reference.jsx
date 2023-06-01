import Header from '../components/Header';
import SharePage from '../components/SharePage';
import BackPrevPage from '../components/BackPrevPage';
import styles from '../style/pages/Reference.module.css';

const Reference = () => {
 return (
  <div className={styles.reference}>
   <Header />
   <BackPrevPage />
   <SharePage />
   <div className={styles.referenceDiv}>
    <div className='row'>
     <a href='https://www.govmap.gov.il'>
      <img
       src='/assets/images/govMap-min.png'
       alt='GovMap'
       className={styles.image}
      />
     </a>
    </div>
    <div className='row'>
     <a href='https://www.misim.gov.il/svinfonadlan2010'>
      <img
       src='/assets/images/logo_shaam_blue-min.png'
       alt='Misim'
       className={styles.image}
      />
     </a>
    </div>
    <div className='row'>
     <a href='https://land.gov.il/OwnershipAndRegistration/Pages/ownership_application.aspx'>
      <img
       src='/assets/images/Minal-img-min.png'
       alt='Minal'
       className={styles.image}
      />
     </a>
    </div>
    <div className='row'>
     <a href='https://ecom.gov.il/voucherspa/input/440'>
      <img
       src='/assets/images/Tabo-img-min.png'
       alt='Tabo'
       className={styles.image}
      />
     </a>
    </div>
   </div>
  </div>
 );
};

export default Reference;
