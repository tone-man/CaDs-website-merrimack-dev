import { useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import FireBaseApp from './firebase';
import Home from './pages/index';
import FacultyDirectory from './pages/facultyDirectoryPage';
import Dashboard from './pages/dashboard';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import './App.css'

// Authentication context
const auth = getAuth(FireBaseApp);


export const AuthContext = createContext(null);

// Add routing
// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/#
function App() {
    const [user, setUser] = useState(null)

    onAuthStateChanged(auth, function(result) {
        console.log(result);
        if (result) {
          setUser(result);  
        } else {
          setUser(null);
        }
    })

    return (
        <AuthContext.Provider value={user}> 
            <Router>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/faculty' element={<FacultyDirectory />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
                <Footer />
            </Router>
        </AuthContext.Provider>
    )
}

export default App
