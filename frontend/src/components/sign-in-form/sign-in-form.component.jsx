/* eslint-disable react/prop-types */
import React from "react";
import { useState, useContext } from 'react';
import axios from 'axios'
import FormInput from '../form-input/form-input.component.jsx';

import { UserContext } from '../context/user.context.jsx';
import { ModelSettingsContext } from "../context/modelSettings.context.jsx";
import { useNavigate } from "react-router-dom";


import './sign-in-form.styles.scss';
import Button2 from '../button2/button2.component.jsx';
import ButtonLink from '../button-link/button-link.component.jsx';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = ({ setValue }) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const { setCurrentUser } = useContext(UserContext);
    const { setOpenAiAPIKey } = useContext(ModelSettingsContext);
    const navigate = useNavigate()

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/token/', {email: email, password: password});
            const user = response.data.user;
            const ApiKey = response.data.api_key;
            setCurrentUser(user);
            setOpenAiAPIKey(ApiKey)
            resetFormFields();
            navigate('/');
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className='sign-up-container'>
            <h2>Sign In</h2>
            <span>Don't have an account?</span>
            <div className='sign-up-link' onClick={() => setValue('sign-up')}>Sign Up</div>
            <form onSubmit={handleSubmit}>
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
                
                <div className='buttons-container'>
                    <ButtonLink to='/'><Button2>Back</Button2></ButtonLink>
                    <Button2 type='submit' onClick={handleSubmit}>Sign In</Button2>
                    {/* <Button2 type='button' onClick={signInWithGoogle}>Google Sign In</Button2> */}
                </div>
            </form>
        </div>
    )
}

export default SignInForm;