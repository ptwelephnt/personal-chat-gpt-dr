/* eslint-disable react/prop-types */
import React from "react";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import axios from "axios";

import FormInput from "../form-input/form-input.component.jsx";
import Button2 from "../button2/button2.component.jsx";
import ButtonLink from "../button-link/button-link.component.jsx";

import PasswordChecker from "../../utils/password-checker/password-checker.utils.js";
import GreenCheck from "../../svg/green-check-mark.svg";
import RedX from "../../svg/red-x.svg";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
	apiKey: "",
};

const tooltipText = {
	length: "Password must be >= 8",
	common: "Password must not be on common list",
	numbers: "Password can't be all numbers",
	match: "Passwords must match",
};

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const SignUpForm = ({ setValue }) => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { firstName, lastName, email, password, confirmPassword, apiKey } =
		formFields;
	const [userData, setUserData] = useState({});
	const [passwordCheckList, setPasswordCheckList] = useState({
		length: false,
		common: false,
		numbers: false,
		match: false,
	});
	const [showTooltip, setShowTooltip] = useState(false);
	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	useEffect(() => {
		PasswordChecker(password, confirmPassword, setPasswordCheckList);
	}, [password, confirmPassword]);

	useEffect(() => {
		const postUserData = async () => {
			try {
				await axios.post(
					"http://127.0.0.1:8000/authenticate/second-create-user/",
					userData
				);
				resetFormFields();
			} catch (error) {
				if (error.code === "auth/email-already-in-use") {
					alert("Cannot create user, email already in use");
				} else {
					console.log("user creation encountered an error", error);
				}
			}
		};
		if (Object.getOwnPropertyNames(userData).length > 0) {
			postUserData();
			setValue("sign-in");
		}
	}, [userData]);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (Object.values(passwordCheckList).some((value) => value === false | emailRegex.test(email) === false)) {
			const emailAlert = emailRegex.test(email) ? "" : "Email is an incorrect format.\n"
            const lengthAlert = passwordCheckList.length ? "" : "Password isn't long enough.\n"
            const commonAlert = passwordCheckList.common ? "" : "Password is too common.\n"
            const numbersAlert = passwordCheckList.numbers ? "" : "Password can't be all numbers.\n"
            const matchAlert = passwordCheckList.match ? "" : "Passwords must match."
            const fullAlert = emailAlert + lengthAlert + commonAlert + numbersAlert + matchAlert
            alert(fullAlert);
			return;
		}

		setUserData({
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: password,
			api_key: apiKey,
		});
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-up-container">
			<h2>Sign up</h2>
			<span>Have an account?</span>
			<div
				className="sign-in-link"
				onClick={() => {
					setValue("sign-in");
				}}>
				Sign In
			</div>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="First Name"
					type="text"
					required
					onChange={handleChange}
					name="firstName"
					value={firstName}
				/>

				<FormInput
					label="Last Name"
					type="text"
					required
					onChange={handleChange}
					name="lastName"
					value={lastName}
				/>

				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>
				<div
					className="password-tooltip"
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: showTooltip ? 1 : 0 }}
						className={`tooltip-text ${
							showTooltip ? "visible" : "hidden"
						}`}>
						{Object.keys(tooltipText).map((item, index) => (
							<p key={index}>
								{tooltipText[item]}:{" "}
								{passwordCheckList[item] ? (
									<img
										className="check-mark-img"
										width="15px"
										height="15px"
										src={GreenCheck}
										alt="Green Checkmark"
									/>
								) : (
									<img
										width="15px"
										height="15px"
										src={RedX}
										alt="Red X"
									/>
								)}
							</p>
						))}
					</motion.div>
					<FormInput
						label="Password"
						type="password"
						required
						onChange={handleChange}
						name="password"
						value={password}
					/>

					<FormInput
						label="Confirm Password"
						type="password"
						required
						onChange={handleChange}
						name="confirmPassword"
						value={confirmPassword}
					/>
				</div>

				<FormInput
					label="OpenAI API Key (optional)"
					type="password"
					onChange={handleChange}
					name="apiKey"
					value={apiKey}
				/>
				<div className="buttons-container">
					<ButtonLink to="/">
						<Button2>Back</Button2>
					</ButtonLink>
					<Button2 type="submit" onClick={handleSubmit}>
						Sign Up
					</Button2>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
