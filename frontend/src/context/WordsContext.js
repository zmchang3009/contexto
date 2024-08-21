import { createContext, useReducer } from 'react'

export const WordsContext = createContext()

// Reducer function takes previous state and action obj (action_type, payload)
const wordsReducer = (state, action) => {
    switch (action.type) {
        // Load words from db and set to context. Payload is a list
        case 'SET_WORDS':
            return {
                words: action.payload
            }
        // Add a newly guessed word to context, according to rank. Payload is a word
        case 'ADD_WORD':
            return {
                words: [action.payload, ...state.words]
                    .sort((w1, w2) => w1.rank - w2.rank)
            }
        default:
            return state
    }
}


// Wraps around the relevant props
export const WordsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(wordsReducer, {
        words: []
    })

    return (
        <WordsContext.Provider value={{...state, dispatch}}>
            {children} {/* This is <App /> here */}
        </WordsContext.Provider>
    )
}