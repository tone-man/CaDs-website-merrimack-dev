import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages/index';
import FacultyDirectory from './pages/facultyDirectory';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// Add routing
// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/#
function App() {
    const [count, setCount] = useState(0)
    return (
        <>
            <Router>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/faculty' element={<FacultyDirectory />} />
                </Routes>
                <Footer />
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>

                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </Router>
        </>
    )
}

export default App
