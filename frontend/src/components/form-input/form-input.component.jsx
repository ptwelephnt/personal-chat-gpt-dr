/* eslint-disable react/prop-types */
import React from "react";
import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
    return(
        <div className="group">
            <input className={`form-input ${otherProps.colormode === 'dark' ? 'dark' : ''}`} {...otherProps}  />
            {label && (
                <label
                    className={`${
                        otherProps.value.length ? 'shrink' : ''
                    } form-input-label`}
                    >
                        {label}
                </label>
                )}
        </div>
    );
};

export default FormInput;