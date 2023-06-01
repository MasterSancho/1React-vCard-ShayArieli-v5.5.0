import styles from '../style/components/Header.module.css';

const Header = () => {
 return (
  <>
   <img
    src='./assets/images/headerImg.jpeg'
    className={styles.img}
    alt='תמונת רקע'
   />
  </>
 );
};

export default Header;
