import React from "react";
import './button2.styles.scss'

const Button2 = ({ children, className, ...otherProps }) => {
    return <button className={`generic-button ${className}`} {...otherProps}>{children}</button>;
  };
  
  export default Button2;