import React from 'react'
import{ Link } from 'react-router-dom'

const ButtonLink =({ children, ...otherProps }) => {
    return <Link className='button-link' {...otherProps}>{children}</Link>
}

export default ButtonLink