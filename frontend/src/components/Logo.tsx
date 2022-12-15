import React from 'react'
import logo from '../assets/logo.png'

interface LogoProps {
    width?: number,
    height?: number,
    style?: string,
};

const Logo = ({width = 160, height = 150, style}: LogoProps) => {
  return (
    <div className={style}>
        <img className='inline-block' src={logo} alt="wearit logo" width={width} height={height} />
    </div>
  )
}

export default Logo