import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, off, set, update, remove } from "firebase/database";
import FireBaseApp from "./firebase";
import Home from "./pages/index";
import FacultyDirectory from "./pages/facultyDirectoryPage";
import EditPage from './pages/EditPage';
import Dashboard from "./pages/dashboard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.css";
import User from "./firebase/user";
import { emailToFirebase } from "./firebase/firebaseFormatter";

// Authentication context
const auth = getAuth(FireBaseApp);

// Realtime Database context
const db = getDatabase(FireBaseApp);

export const UserContext = createContext(null);

// Add routing
// https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/#
function App() {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, function (result) {

    // No result then return
    if (!(result && result.uid && result.email))
      return;

    const uid: string = result.uid;
    const email: string = emailToFirebase(result.email);

    //Debounce if user already is exists.
    if (user)
      return;

    // Create db listeners
    const uidListener = ref(db, `users/${uid}`);
    const emailListener = ref(db, `users/${email}`);

    // Listen for the uid
    onValue(uidListener, (snapshot) => {

      // If snapshot does not exist exit early
      if (!snapshot.val()) {
        return;
      }

      //Since the snapshot exists we just load the data
      const { email, name, photoURL, userLevel } = snapshot.val();

      setUser(new User(uid, email, name, photoURL, userLevel))

    });

    // Listen for the email
    onValue(emailListener, (snapshot) => {

      // If snapshot does not exist unsubscribe listener
      if (!snapshot.val()) {
        //TODO: Unsub listener
        return;
      }

      const { userLevel, email } = snapshot.val();

      console.log(userLevel, email, uid)

      // Move data to a key with the uid
      set(ref(db, 'users/' + uid), {
        name: result.displayName,
        photoURL: result.photoURL,
        email: email,
        userLevel: userLevel
      });

      //Delete the email key
      remove(emailListener);

      //TODO: Unsub listener
    });

  });

  return (
    <UserContext.Provider value={user}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faculty" element={<FacultyDirectory />} />
          <Route path='/edit' element={<EditPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
