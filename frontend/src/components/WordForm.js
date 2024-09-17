// Form for submitting word guesses
import { useState } from 'react'
import { useWordsContext } from '../hooks/useWordsContext'
import wordChecker from '../utils/wordChecker'

const WordForm = () => {
    const { dispatch } = useWordsContext()
    const [word, setWord] = useState('')
    const [error, setError] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault() // Stop automatic page reload

        // Get response from wordChecker
        const puzzleApi = `/api/puzzle/${word}`
        const response = await wordChecker(word, puzzleApi)
        console.log('word checker output', response)
        
        // Deprecated: Fetch from API directly
        // const response = await fetch(`/api/puzzle/${word}`)
        // const json = await response.json()

        if (!response.ok) {
            setError(response.message)
            console.log(error)
        } else {
            // Reset states
            setWord('')
            setError(null)
            dispatch({type: 'ADD_WORD', payload: response.data}) // Update global state locally
        }
    }


    return (
        <form className='puzzleForm' onSubmit={submitHandler}>
            <label>Guess a word: </label>
            <input 
                type='text'
                onChange={(e) => setWord(e.target.value)}
                value={word}
            />
            <button>Submit</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}


export default WordForm