import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { UserContext } from "../context/user.context.jsx";

import { LoremIpsum } from 'react-lorem-ipsum';

import ModelSettingsForm from "../model-settings-form/model-settings-form.component.jsx";
import SideBar from "../side-bar/side-bar.component.jsx";

import "./personal-chat-gpt.styles.scss";

const exampleHistory = [
	'thihslkj asldkfansdoi aslkdnfasoi',
	';dansof djnskadfn skdjfna djfn al a;sldn',
]
const PersonalChatGPT = () => {
	const [openSideBar, setOpenSideBar] = useState(false);
	const [question, setQuestion] = useState('');
	const { currentUser } = useContext(UserContext);
	const [name, setName]= useState('Personal')

	useEffect(() => {
		if (currentUser === undefined | currentUser === null | currentUser === '') {
			setName('Personal')
		} else {
			setName(`${currentUser}'s`)
		}
	}, [currentUser])

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
				<hr></hr>
				<hr></hr>
				<hr></hr>
			</div>
			<SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}>
				<ModelSettingsForm />
			</SideBar>
			{/* Main Page */}
			<div className="main-page">
				<h3 className="main-header">{name} Question-Answering AI</h3>
				<div className="chat-container">
					<div className="answer-container">
						<div className="text-area">
							{exampleHistory.map((history, index) => (
								<div key={index} className="answer"><LoremIpsum p={1} /></div>
							))}
						</div>	
						
					</div>	
					<div className="question-container">
						<label className="question-label">Ask a question about the content of your file:</label>
						<input className="question-input" type="text" value={question} onChange={handleQuestionChange} />
					</div>			
				</div>
			</div>
		</div>
	);
};

export default PersonalChatGPT;
