/* eslint-disable react/prop-types */
import React, { useContext } from "react"; 
import { motion } from 'framer-motion';

import ButtonLink from "../button-link/button-link.component.jsx";
import Button2 from "../button2/button2.component.jsx";
import { UserContext } from "../context/user.context.jsx";
import { ModelSettingsContext } from "../context/modelSettings.context.jsx";

import './side-bar.styles.scss'

const SideBar = ({ openSideBar, setOpenSideBar,children}) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { setOpenAiAPIKey } = useContext(ModelSettingsContext)

    const signOutClick = () => {
        setCurrentUser('');
        setOpenAiAPIKey('');
    }

    return (
        <motion.div
            className="side-bar"
            initial={{ width: 0 }}
            animate={{ width: openSideBar ? "45vw" : 0 }}
            transition={{ duration: 0.5 }}>
            <div className="top-buttons-container">
                {currentUser ? <Button2 className='sign-out-button' onClick={signOutClick}>Sign Out</Button2> : <ButtonLink className='sign-in-link' to='/sign-in'><Button2>Sign In</Button2></ButtonLink>}
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