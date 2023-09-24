import React from "react";
import { useContext, useState } from "react";
import { Fragment } from "react";

import { ModelSettingsContext } from "../context/modelSettings.context.jsx";
import FormInput from "../form-input/form-input.component.jsx";
import Dropdown from "../dropdown/dropdown.component.jsx";
import IncrimentingInput from "../incrimenting-input/incrimenting-input.component.jsx";
import Slider from "../slider/slider.component.jsx";
import Button2 from "../button2/button2.component.jsx";

import './model-settings-form.styles.scss'

const modelOptions = ["gpt-3.5-turbo", "gpt-4"];
const radioLabels = ['File', 'URL'];

const ModelSettingsForm = () => {
    const { openAiAPIKey, setOpenAiAPIKey, modelName, setModelName, chunkSize, setChunkSize, kValue, setKValue, temperature, setTemperature } = useContext(ModelSettingsContext)
    const [radioValue, setRadioValue] = useState('')

    const handleAPIKeyChange = (event) => {
        const { value } = event.target
        setOpenAiAPIKey(value)
    }

    const submitForm = (event) => {
        event.preventDefault()
        console.log(openAiAPIKey, radioValue, modelName, chunkSize, kValue, temperature)
    }
    return (
        <Fragment>
            <form className="settings-form">
                <FormInput
                    label="OpenAI API Key"
                    type="password"
                    required
                    onChange={handleAPIKeyChange}
                    name="openAiApiKey"
                    value={openAiAPIKey}
                    classes='apiKeyInput dark'
                />
                <div className="radio-container">
                    <label>Load Documents From...</label>
                    {radioLabels.map((radioLabel, index) => (
                        <div key={index}>
                            <input type="radio" value={radioLabel} name="fileType" onChange={() => setRadioValue(radioLabel)} />
                            <label>{radioLabel}</label>   
                        </div>
                    ))}                
                </div>
                {radioValue === 'File' ? '' : radioValue == 'URL' ? '' : ''}
                <div className="file-upload">{/* insert upload */}</div>
                <Dropdown options={modelOptions} name='modelName' value={modelName} setValue={setModelName} />
                <IncrimentingInput label='Chunk Size' min={100} max={2048} defaultValue={512} value={chunkSize} setValue={setChunkSize} />
                <IncrimentingInput label='k' min={1} max={20} defaultValue={3} value={kValue} setValue={setKValue} />
                <Slider label='Temperature' min={0.00} max={1.00} defaultValue={0.00} value={temperature} setValue={setTemperature} />
                <Button2 className='add-data-button' onClick={submitForm}>Add Data</Button2>
            </form>
        </Fragment>
    )
}

export default ModelSettingsForm