import React from 'react'

const date = () => {
  return new Date().getFullYear()
}

const Footer = () => (
  <div id="footer">
    &copy; {date()} Moebel.de
  </div>
)

export default Footer