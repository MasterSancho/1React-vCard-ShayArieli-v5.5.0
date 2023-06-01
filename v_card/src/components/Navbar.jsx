import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUserTie, FaRegIdBadge } from 'react-icons/fa';
import styles from '../style/components/Navbar.module.css';

const Navbar = () => {
 const navigate = useNavigate();
 const location = useLocation();

 const pathMatchRoute = (route) => {
  if (route === location.pathname) {
   return true;
  }
 };

 return (
  <footer className={styles.navbar}>
   <nav className={styles.navbarNav}>
    <ul className={styles.navbarListItems}>
     <li className={styles.navbarListItem} onClick={() => navigate('/')}>
      <FaRegIdBadge fill={pathMatchRoute('/') ? 'red' : 'white'} size={26} />
     </li>
     <li className={styles.navbarListItem} onClick={() => navigate('/explore')}>
      <FaHome fill={pathMatchRoute('/explore') ? 'red' : 'white'} size={26} />
     </li>
     <li className={styles.navbarListItem} onClick={() => navigate('/profile')}>
      <FaUserTie
       fill={pathMatchRoute('/profile') ? 'red' : 'white'}
       size={26}
      />
     </li>
    </ul>
   </nav>
  </footer>
 );
};

export default Navbar;
