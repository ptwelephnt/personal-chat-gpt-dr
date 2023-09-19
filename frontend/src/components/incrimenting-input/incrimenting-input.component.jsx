/* eslint-disable react/prop-types */
import React from "react";
import { useEffect } from 'react'
import './incrimenting-input.styles.scss'

const IncrimentingInput = ({ label, min, max, defaultValue, value, setValue }) => {

    useEffect(() => {
        setValue(defaultValue)
    }, [setValue, defaultValue])

    const handleChange = (event) => {
        const { value } = event.target
        if (value > max) {
            setValue(max)
        } else if (value < min) {
            setValue(min)
        } else {
            setValue(value)
        }
    }

    const subtractFromCurrent = () => {
        if (value > min) {
            setValue(value - 1)
        }
    }

    const addToCurrent = () => {
        if (value < max) {
            setValue(value + 1)
        }
    }
    return (
        <div className='incrimenting-input-container'>
            <label className='incrimenting-input-label'>{label}</label>
            <div className="incrimenting-input">
                <input type='text' className='input-number' value={value} onChange={handleChange} />
                <div className="incriment-container">
                    <div className="value-incrimenter" onClick={subtractFromCurrent}> - </div>
                    <div className="value-incrimenter" onClick={addToCurrent}>+</div>	
                </div>
            </div>
        </div>
        
    )
}

export default IncrimentingInput