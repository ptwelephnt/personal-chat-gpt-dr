import React from "react";
import { createContext } from 'react'
import { useState } from 'react';

export const ModelSettingsContext = createContext({
    openAiAPIKey: '',
    setOpenAiAPIKey: () => {},
    modelName: '',
    setModelName: () => {},
    chunkSize: '',
    setChunkSize: () => {},
    kValue: '',
    setKValue: () => {},
    temperature: '',
    setTemperature: () => {}
});

export const ModelSettingsProvider = ({ children }) => {
    const [openAiAPIKey, setOpenAiAPIKey] = useState('');
    const [modelName, setModelName] = useState('');
    const [chunkSize, setChunkSize] = useState(0);
    const [kValue, setKValue] = useState(0)
    const [temperature, setTemperature] = useState(0);
    const value = { openAiAPIKey, setOpenAiAPIKey, modelName, setModelName, chunkSize, setChunkSize, kValue, setKValue, temperature, setTemperature };

    return <ModelSettingsContext.Provider value={value}>{children}</ModelSettingsContext.Provider>
}