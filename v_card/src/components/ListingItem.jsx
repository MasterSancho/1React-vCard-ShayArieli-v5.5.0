import { Link } from 'react-router-dom';
import { FaTrash, FaPen } from 'react-icons/fa';
import styles from '../style/components/ListingItem.module.css';

const ListingItem = ({ listing, id, onEdit, onDelete }) => {
 return (
  <>
   <li dir='rtl' className={styles.li}>
    <Link to={`/category/${listing.type}/${id}`} className={styles.liLink}>
     <img
      src={listing.imgUrls[0]}
      alt={listing.name}
      className={styles.liListImg}
     />

     <div className={styles.liListDiv}>
      <p className={styles.liListDivP}>
       {listing.type === 'rent' ? 'להשכרה' : 'למכירה'} {listing.propertyType}
      </p>
      <p className={styles.liListDivP_P}> {listing.address}</p>

      {listing.price > 0 ? (
       <p className={styles.liListDivP_P_P}>
        {listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}₪
        {listing.type === 'rent' && ' / לחודש'}
       </p>
      ) : (
       <p className={styles.liListDivP_P_P}>תתקשר לקבל פרטים</p>
      )}

      <div>
       <p className={styles.lineHeight}>
        {listing.bedrooms > 0 && (
         <span className={styles.liListDivDivPSpan}>
          {listing.bedrooms > 1 ? `${listing.bedrooms} חדרים` : '1 חדר'}
         </span>
        )}

        {listing.meter > 0 && (
         <span className={styles.liListDivDivPSpan}>
          {listing.meter > 1 ? `${listing.meter} מטר בנוי` : '1 מטר בנוי'}
         </span>
        )}

        {listing.gardenMeter > 0 && (
         <span className={styles.liListDivDivPSpan}>
          {listing.gardenMeter > 1
           ? `${listing.gardenMeter} מטר גינה`
           : '1 מטר גינה '}
         </span>
        )}

        {listing.areaMeter > 0 && (
         <span className={styles.liListDivDivPSpan}>
          {listing.areaMeter > 1
           ? `${listing.areaMeter} מטר מגרש`
           : '1 מטר מגרש'}
         </span>
        )}
       </p>
      </div>
     </div>
    </Link>

    {onDelete && (
     <FaTrash
      className={styles.liSvg}
      fill='rgb(231, 76,60)'
      onClick={() => onDelete(listing.id, listing.name)}
     />
    )}

    {onEdit && (
     <FaPen
      className={styles.liSvg_Svg}
      fill='rgb(231, 76,60)'
      onClick={() => onEdit(id)}
     />
    )}
   </li>
  </>
 );
};

export default ListingItem;
