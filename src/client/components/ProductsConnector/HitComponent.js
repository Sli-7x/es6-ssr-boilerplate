import React from 'react'
import styles from './productsStyles.css'

export const HitComponent = ({ hit }) => {
  return <div className={styles.itemContent}>
    <div className={styles.item}>
      <div className={styles.itemPicture}>
        <div className={styles.itemPictureWrapper}>
          <img src="/images/loading.gif" data-src={`${hit.image}`} alt={hit.name}/>
        </div>
      </div>
      <div className={styles.hitContent}>
        <div className={styles.itemTitleContent}>
          <div className={styles.itemTitle}>{hit.name}</div>
          <div className={styles.itemPrice}>{hit.price} &euro;</div>
        </div>
        {[...Array(hit.rating).keys()].map((val) => <span key={val}>&#x2606;</span>)}
        <div className={styles.hitType}>
          <span>{hit.type}</span>
        </div>
        <div className={styles.itemDescription}>{hit.description}</div>
      </div>
    </div>
  </div>
}