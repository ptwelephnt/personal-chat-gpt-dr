import React, { useState } from 'react';

import { motion } from 'framer-motion';

import Button2 from '../button2/button2.component.jsx';
import './url-loader.styles.scss';

const UrlLoader = () => {
    const [urlInput, setUrlInput] = useState('')
    const [urls, setUrls] = useState([])
    console.log(urls)
    const handleUrlClick = (index) => {
        const urlHolder = [...urls]
        urlHolder.splice(index, 1)
        setUrls(urlHolder)
    }

    const handleUrlChange = (event) => {
        const { value } = event.target
        setUrlInput(value)
    }

    const handleAddClick = () => {
        event.preventDefault()
        if (urlInput !== ''){
            const urlHolder = [...urls, urlInput]
            setUrls(urlHolder)
            setUrlInput('')
        }
    } 
    return (
        <div className='url-loader-container'>
            <input className='url-input' value={urlInput} onChange={handleUrlChange} />
            <div className='check-box-container'>
                <input type='checkbox' name='url-checkbox' />
                <label name='url-checkbox'>Add URLs contained in page</label>
            </div>
            <Button2 onClick={handleAddClick}>Add</Button2>
            <div className='url-list-container'>
                {urls ? urls.map((url, index) => (
                    <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='url' onClick={() => handleUrlClick(index)}>
                        <span>{url}</span>
                    </motion.div>
                )) : ''}
            </div>
        </div>
    )
}

export default UrlLoader;