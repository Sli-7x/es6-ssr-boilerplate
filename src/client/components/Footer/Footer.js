import React from 'react'
import styles from './footer.css'

const date = () => {
  return new Date().getFullYear()
}

const Footer = () => (
  <div className={styles.footer}>
    &copy; {date()} Moebel.de
  </div>
)

export default Footer