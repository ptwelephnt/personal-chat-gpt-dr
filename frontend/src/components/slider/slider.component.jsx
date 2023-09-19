/* eslint-disable react/prop-types */
import React from "react";
import { useEffect } from 'react'
import './slider.styles.scss'

const Slider = ({ label, min, max, defaultValue, value, setValue }) => {
    useEffect(() => {
        setValue(defaultValue)
    }, [setValue, defaultValue])

    const handleChange = (event) => {
        const { value } = event.target

        setValue(value)
    }
    return (
        <div className='slider-container'>
            <label className='slider-label'>{label}</label>
            <label className='slider-value'>{value}</label>
            <input className='slider' type='range' min={min} max={max} value={value} step={.01} onChange={handleChange} />
            <div className='slider-min-max'>
                <label className='slider-min'>{min}</label>
                <label className='slider-max'>{max}</label>
            </div>
        </div>
    )
}

export default Slider