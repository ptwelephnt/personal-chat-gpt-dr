/* eslint-disable react/prop-types */
import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios'
import FormInput from '../form-input/form-input.component.jsx';

import './sign-up-form.styles.scss';
import Button2 from '../button2/button2.component.jsx';

const defaultFormFields = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    apiKey: '',
}

const SignUpForm = ({ setValue }) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { firstName, lastName, email, password, confirmPassword, apiKey } = formFields;
    const [userData, setUserData] = useState({})
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        setUserData({first_name: firstName, last_name: lastName, email: email, password: password, api_key: apiKey})


    };

    useEffect(() => {
        const postUserData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/authenticate/create-user/', userData)
                resetFormFields();
                console.log(response.data)
            } catch(error) {
                if(error.code === 'auth/email-already-in-use') {
                    alert('Cannot create user, email already in use');
                } else {
                    console.log('user creation encountered an error', error);
                }
            }   
        }

        postUserData()
    }, [userData])

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className='sign-up-container'>
            <h2>Sign up</h2>
            <span>Have an account?</span>
            <div className='sign-in-link' onClick={() => {setValue('sign-in')}}>Sign In</div>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="First Name"
                    type='text'
                    required
                    onChange={handleChange}
                    name='firstName'
                    value={firstName}
                />

                <FormInput
                    label="Last Name"
                    type='text'
                    required
                    onChange={handleChange}
                    name='lastName'
                    value={lastName}
                />

                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />

                <FormInput
                    label="OpenAI API Key (optional)"
                    type="password"
                    onChange={handleChange}
                    name='apiKey'
                    value={apiKey}
                />
                <Button2 type='submit' onClick={handleSubmit}>Sign Up</Button2>
            </form>
        </div>
    )
}

export default SignUpForm;