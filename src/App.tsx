import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, set, remove, get } from "firebase/database";
import FireBaseApp from "./firebase";
import Home from "./pages/index";
import FacultyDirectory from "./pages/facultyDirectoryPage";
import FacultyPage from './pages/FacultyPage'
import EditPage from './pages/EditPage';
import Dashboard from "./pages/dashboard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.css";
import User from "./firebase/user";
import { emailToFirebase } from "./firebase/firebaseFormatter";
import { ToastContextProvider } from "./components/toasts/ToastContext";
import { generateFacultyPage } from "./utils/createNewDraft";

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
    if (!(result && result.uid && result.email)) {
      setUser(null)
      return;
    }

    const uid: string = result.uid;
    const email: string = emailToFirebase(result.email);

    //Debounce if user already is exists.
    if (user)
      return;

    // Create db listeners
    const uidListener = ref(db, `users/${uid}`);
    const emailListener = ref(db, `users/${email}`);
    const pageListener = ref(db, `pages/${email}`);

    // Listen for the uid
    onValue(uidListener, (snapshot) => {

      // If snapshot does not exist exit early
      if (!snapshot.val()) {
        return;
      }

      //Since the snapshot exists we just load the data
      const { email, name, photoURL, userLevel, phoneNumber, title, pronouns, department, location } = snapshot.val();

      setUser(new User(uid, email, name, photoURL, userLevel, phoneNumber, title, pronouns, department, location))

    });

    // Listen for the email
    onValue(emailListener, (snapshot) => {

      // If snapshot does not exist unsubscribe listener
      if (!snapshot.val()) {
        //TODO: Unsub listener
        return;
      }

      const { email, userLevel, phoneNumber, title, pronouns, department, location } = snapshot.val();

      const newUser: User = new User(
        uid,
        email,
        result.displayName,
        result.photoURL,
        userLevel,
        phoneNumber,
        title,
        pronouns,
        department,
        location
      );

      console.log(newUser);

      // Move data to a key with the uid
      set(uidListener, newUser.toFirebaseObject());

      // Delete the email key
      remove(emailListener);
    });

    onValue(pageListener, (snapshot) => {
      // Move page to a key with the uid
      console.log("PAGE OBJECT", snapshot.val());
      console.log(uid);

      // If snapshot does not exist unsubscribe listener
      if (!snapshot.val()) {
        //TODO: Unsub listener
        return;
      }

      const pageObject: any = snapshot.val()

      if (uid) {
        set(ref(db, `pages/${uid}`), pageObject);
        remove(pageListener);
      }
    })
  });

  return (
    <UserContext.Provider value={user}>
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
    </UserContext.Provider>
  );
}

export default App;
