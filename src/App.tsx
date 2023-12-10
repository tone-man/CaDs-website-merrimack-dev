import { useState, createContext} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import FireBaseApp from "./firebase";
import Home from "./pages/index";
import FacultyDirectory from "./pages/facultyDirectoryPage";
import FacultyPage from './pages/FacultyPage'
import EditPage from './pages/EditPage';
import Dashboard from "./pages/dashboard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.css";
import { ToastContextProvider } from "./components/toasts/ToastContext";

// Authentication context
const auth = getAuth(FireBaseApp);

// Realtime Database context
const db = getDatabase(FireBaseApp);

export const AuthContext = createContext(null);

// Add routing
// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/#
function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, function (result) {
    if (result) {

      if (user) //Debounce if user already is set.
        return;
      // Check that user is within the whitelist
      const userRef = ref(db, `users/${result.uid}`);

      // Update user when snapshot is retrieved
      onValue(userRef, (snapshot) => {
        if (snapshot) {
          console.log(snapshot.val());
          setUser(snapshot.val());
        }

      });
    } else {
      setUser(null);
    }
  });

  return (
    <AuthContext.Provider value={user}>
      <ToastContextProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facultyDirectory" element={<FacultyDirectory />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path='/edit' element={<EditPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
      </ToastContextProvider>
    </AuthContext.Provider>
  );
}

export default App;
