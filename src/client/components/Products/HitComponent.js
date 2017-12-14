import React from 'react'
import { Highlight } from 'react-instantsearch/dom'
import styles from './productsStyles.css'

export const HitComponent = ({ hit }) => (
  <div className={styles.hit}>
    <div>
      <div className={styles.hitPicture}>
        <img src="/images/loading.gif" data-src={`${hit.image}`} />
      </div>
    </div>
    <div className={styles.hitContent}>
      <div>
        <Highlight attributeName="name" hit={hit} />
        <span> - ${hit.price}</span>
        <span> - {hit.rating} stars</span>
      </div>
      <div className={styles.hitType}>
        <Highlight attributeName="type" hit={hit} />
      </div>
      <div className="hit-description">
        <Highlight attributeName="description" hit={hit} />
      </div>
    </div>
  </div>
)