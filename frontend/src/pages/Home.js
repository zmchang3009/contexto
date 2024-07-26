import { useEffect } from 'react'
import { useDummiesContext } from '../hooks/useDummiesContext'

// Components
import Dummy from '../components/Dummy'
import DummyForm from '../components/DummyForm'

const Home = () => {
    const {dummies, dispatch} = useDummiesContext()
    
    useEffect(() => {
        const fetchDummies = async () => {
            // React will proxy the below request to the specified server
            // Addresses CORS. To be updated for production
            const response = await fetch('/api/dummy/')
            const json = await response.json()

            if (response.ok) {
                // Update global state (context) with dispatch function
                dispatch({type: 'SET_DUMMIES', payload: json})
            }
        }

        fetchDummies()
    }, [dispatch]) // Dependency array: Re-runs useEffect when elements are updated

    return (
        <div className='home'>
            <h1>Home</h1>
            <DummyForm />
            <div className='dummies'>
                {/* Run below only if dummies state is defined */}
                {dummies && dummies.map((dummy) => {
                    return (
                        <Dummy key={dummy._id} dummy={dummy}/>
                    )
                })}
            </div>
        </div>
    )
}


export default Home