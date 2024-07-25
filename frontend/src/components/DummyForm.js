// Form to create new dummies
import { useState } from 'react'
import { useDummiesContext } from '../hooks/useDummiesContext'

const DummyForm = () => {
    const { dispatch } = useDummiesContext()
    const [text, setText] = useState('')
    const [rank, setRank] = useState(0)
    const [error, setError] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault() // Stop automatic page reload

        const dummy = {text, rank}

        const response = await fetch('/api/dummy', {
            method: 'POST',
            body: JSON.stringify(dummy),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(response.error)
            console.log(error)
        } else {
            // Reset states
            setText('')
            setRank(0)
            setError(null)
            dispatch({type: 'CREATE_DUMMY', payload: json}) // Update global state (context)
            console.log('New dummy added', json)
        }
    }

    return (
        <form className='dummyForm' onSubmit={submitHandler}>
            <h3>Add a new dummy</h3>
            <label>Text: </label>
            <input 
                type='text'
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <label>Rank: </label>
            <input 
                type='number'
                onChange={(e) => setRank(e.target.value)}
                value={rank}
            />
            <button>Add dummy</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}


export default DummyForm