// Custom hook to help access context
import { WordsContext } from '../context/WordsContext'
import { useContext } from 'react'

export const useWordsContext = () => {
    const context = useContext(WordsContext)

    // Check that function is within the scope of WordsContextProvider
    if (!context) {
        throw Error('useWordsContext must be used inside a WordsContextProvider')
    }

    return context
}
