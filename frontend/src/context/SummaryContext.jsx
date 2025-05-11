import { createContext, useState } from 'react'

export const SummaryContext = createContext()

export const SummaryProvider = ({children}) => {

    const [loading, setLoading] = useState(false)
    const [transcriptionText, setTranscriptionText] = useState()
    const [videoSummary, setVideoSummary] = useState()

    const value = {
        loading, setLoading,
        transcriptionText, setTranscriptionText,
        videoSummary, setVideoSummary
    }

    return (
        <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>
    )
}