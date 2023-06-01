import Links from '../components/Links';
import AddContactBtn from '../components/AddContactBtn';
import ShareLinks from '../components/ShareLinks';
import About from '../components/About';
import SlideshowRecom from '../components/SlideshowRecom';
import Divider from '../components/Divider';
import Header from '../components/Header';
import ListingItemCarousel from '../components/ListingItemCarousel';
import styles from '../style/pages/Vcard.module.css';
import SlideshowGallery from '../components/SlideshowGallery';

const Vcard = () => {
 return (
  <div className={styles.vCard}>
   <Header />
   <div className='container'>
    <Links />
    <AddContactBtn />
    <ShareLinks />
    <Divider />
    <ListingItemCarousel />
    <Divider />
    <SlideshowGallery />
    <Divider />
    <About />
    <Divider />
    <SlideshowRecom />
    <Divider />
   </div>
  </div>
 );
};

export default Vcard;
