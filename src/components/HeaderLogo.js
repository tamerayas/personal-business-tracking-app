import React from 'react'

//Ant Design
import { GitlabOutlined } from '@ant-design/icons';

function HeaderLogo() {
  return (
    <div className='header-wrapper'>
      <GitlabOutlined style={{ fontSize: 50 }} />
      <span className='header-title'>PERSONAL BUSINESS TRACKING APP</span>
    </div>
  )
}
export default HeaderLogo;