import React from "react";
import { useState } from "react";
import "./personal-chat-gpt.styles.scss";
import ModelSettingsForm from "../model-settings-form/model-settings-form.component.jsx";
import SideBar from "../side-bar/side-bar.component.jsx";

const PersonalChatGPT = () => {
	const [openSideBar, setOpenSideBar] = useState(false);
	const [question, setQuestion] = useState('')

	const handleQuestionChange = (event) => {
		const { value } = event.target

		setQuestion(value)
	}

	return (
		<div className="personal-chat-gpt">
			{/* Side bar */}
			<div
				className="side-bar-toggle"
				onClick={() => {
					setOpenSideBar(!openSideBar);
				}}>
				{">>"}
			</div>
			<SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}>
				<ModelSettingsForm />
			</SideBar>
			{/* Full Page */}
			<div className="main-page">
				<h3 className="main-header">LLM Question-Answering App</h3>
				<div className="question-container">
					<label className="question-label">Ask a question about the content of your file:</label>
					<input className="question-input" type="text" value={question} onChange={handleQuestionChange} />
				</div>
			</div>
		</div>
	);
};

export default PersonalChatGPT;
