import { DummiesContext } from '../context/DummiesContext'
import { useContext } from 'react'

// Custom hook to help access context
export const useDummiesContext = () => {
    const context = useContext(DummiesContext)

    // Check that function is within the scope of DummiesContextProvider
    if (!context) {
        throw Error('useDummiesContext must be used inside a DummiesContextProvider')
    }

    return context
}
