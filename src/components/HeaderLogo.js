import React from 'react'

function HeaderLogo() {
  return (
    <React.Fragment>
      <img src='logo.svg' alt="logo" width={100} />
      <span className='header-title'>Logo</span>
    </React.Fragment>
  )
}
export default HeaderLogo;