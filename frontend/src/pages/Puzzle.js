// Puzzle page
import { useEffect } from 'react'
import { useWordsContext } from '../hooks/useWordsContext'

// Components
import WordForm from '../components/WordForm'
import Word from '../components/Word'

const Puzzle = () => {
    // Context for guesses
    const {words, dispatch} = useWordsContext()

    // TODO: useEffect hook to retrieve prior guesses from db
    useEffect(() => {
        const fetchGuesses = async () => {
            console.log('Retrieving prior guesses')
            
            // Update context with dispatch function
        }

        fetchGuesses()
    }, [dispatch]) // Re-runs useEffect when elements are updated


    return (
        <div className='puzzle'>
            <h1>Puzzle</h1>
            <WordForm />
            <div className='words'>
                {/* Run below only if words state is defined */}
                {words && words.map((word) => {
                    return (
                        <Word key={word._id} word={word}/>
                    )
                })}
            </div>
        </div>
    )
}


export default Puzzle