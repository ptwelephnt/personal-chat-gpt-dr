/* eslint-disable react/prop-types */
import React from "react"; 
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './side-bar.styles.scss'

const SideBar = ({ openSideBar, setOpenSideBar,children}) => {
    
    return (
        <motion.div
            className="side-bar"
            initial={{ width: 0 }}
            animate={{ width: openSideBar ? "50vw" : 0 }}
            transition={{ duration: 0.5 }}>
            <div className="top-buttons-container">
                <Link className='sign-in-link' to='/sign-in'>Sign In</Link>
                <button
                    className="side-bar-close-button"
                    onClick={() => {
                        setOpenSideBar(!openSideBar);
                    }}>
                    {"X"}
                </button>
                
            </div>
            {children}
        </motion.div>

    )
}

export default SideBar