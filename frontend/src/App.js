import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages and components
import Home from './pages/Home'
import Puzzle from './pages/Puzzle'
import NavBar from './components/NavBar'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <div className='pages'> {/* All pages are rendered in this div */}
          <Routes>
            <Route 
              path='/'
              element={<Home />}
            />
            <Route 
              path='/puzzle'
              element={<Puzzle />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
