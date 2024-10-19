// Navigation bar component at the top of every page
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <header>
            <div className='container'>
                <Link to={'/'}>
                    <h2>Home</h2>
                </Link>
                <Link to={'/puzzle'}>
                    <h2>Puzzle</h2>
                </Link>
            </div>
        </header>
    )
}


export default NavBar