import React from "react";
import './button2.styles.scss'

const Button2 = ({ children, ...otherProps }) => {
    return <button className='generic-button' {...otherProps}>{children}</button>;
  };
  
  export default Button2;