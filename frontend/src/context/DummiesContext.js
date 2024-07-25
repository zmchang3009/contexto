import { createContext, useReducer } from 'react'

export const DummiesContext = createContext()

// Reducer function takes previous state and action obj (action_type, payload)
const dummiesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DUMMIES':
            return {
                dummies: action.payload
            }
        case 'CREATE_DUMMY':
            return {
                dummies: [action.payload, ...state.dummies]
                    .sort((d1, d2) => d1.rank - d2.rank)
            }
        default:
            return state
    }
}


// Props = Components wrapped by this component
export const DummiesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dummiesReducer, {
        dummies: null
    })

    return (
        <DummiesContext.Provider value={{...state, dispatch}}>
            {children} {/* This is <App /> here */}
        </DummiesContext.Provider>
    )
}
