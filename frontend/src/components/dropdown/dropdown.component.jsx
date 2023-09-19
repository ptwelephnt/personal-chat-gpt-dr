/* eslint-disable react/prop-types */
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import "./dropdown.styles.scss";

const Dropdown = ({ options, value, setValue }) => {
    const dropdownOptions = options
    const [dropdownOpen, setDropdownOpen] = useState(false);
	const [hoveredOption, setHoveredOption] = useState(-1);

	const handleModelClick = (name) => {
		setValue(name)
		setDropdownOpen(false);
	};

	return (
		<div className="dropdown-container">
			<label className="dropdown-label">Model</label>
			<div
				className="dropdown"
				onClick={() => {
					setDropdownOpen(!dropdownOpen);
				}}>
				<div className="dropdown-main">
					<label className="selected-item">{value}</label>
					<div
						className="arrow"
						style={{
							transform: dropdownOpen ? "" : "rotate(180deg)",
						}}>
						^
					</div>
				</div>
			</div>
			<motion.div className="model-options" initial={{ height: 0 }}
								animate={{ height: "fit-content" }}
								transition={{ duration: 0.5 }}>
				{dropdownOpen
					? dropdownOptions.map((option, index) => (
							<motion.div
								key={index}
								className={`model-option ${
									hoveredOption === index ? "hovered" : ""
								}`}
								onMouseEnter={() => setHoveredOption(index)}
								onMouseLeave={() => setHoveredOption(-1)}
								onClick={() => {
									handleModelClick(option);
								}}>
								{option}
							</motion.div>
                    ))
					: ""}
			</motion.div>
		</div>
	);
};

export default Dropdown;
