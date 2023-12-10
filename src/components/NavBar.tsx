import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Container, FormControl, InputGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../css/navBar.css';
import FireBaseApp from '../firebase';
import ProfileImage from './ProfileImage';
import merrimackLogo from '../imgs/logo.webp';
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, signInWithRedirect, signOut, GoogleAuthProvider } from 'firebase/auth';
import { UserContext } from '../App';
import User from '../firebase/user';

const db = getDatabase(); //Global DB Connection

// Component to create the nav bar
function NavBar() {
    // Declare useState variables and useRef variables
    const [isFocused, setIsFocused] = useState(false);
    const user: User | null = useContext(UserContext);
    const searchBarRef = useRef<HTMLInputElement | null>(null);
    // This useEffect displays/hides the search bar when isFocused changes
    useEffect(() => {
        const searchBar = document.getElementById('searchBar-container');
        if (searchBar && searchBar.style.display === 'none') {
            searchBar.style.display = 'block';
        }
        else if (searchBar && searchBar.style.display === 'block') {
            searchBar.style.display = 'none';
        }
    }, [isFocused]);

    // Whenever the search icon is clicked on the second nav bar, this function changes the isFocused variable
    function toggleSearch() {
        setIsFocused(!isFocused);
    }

    // Whenever the user enters text into the search bar and clicks the search icon, this search function will get triggered
    //TODO: Actually have this function search something
    function search() {
        if (searchBarRef.current) {
            const searchText = searchBarRef.current.value;
            if (searchText) {
                console.log("Search text:", searchText);
                searchBarRef.current.value = "";
                console.log("new" + searchBarRef.current.value)
            }
        }
    }
    function logOut() {

        const auth = getAuth(FireBaseApp);

        //Sign the user out
        signOut(auth);
    }

    // https://codesandbox.io/s/position-fixed-on-scroll-bqcl2?file=/src/App.js:811-820
    //Function that makes the secondary nav bar "sticky" and stick to the top of the page after scrolling
    useEffect(() => {
        function handleScroll() {
            // Get the second navbar element by its ID
            const secondNavbar = document.getElementById('second-navbar');

            if (secondNavbar) {
                //Get the distance between the search bar and the top of the page
                const stickyPoint = secondNavbar?.getBoundingClientRect().top;
                //If the current page's height is greater than the stickyPoint, make the secondary nav bar "sticky"
                if (stickyPoint < window.scrollY) {
                    secondNavbar.style.position = "fixed";
                } else {
                    secondNavbar.style.position = "relative";
                }
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav>
            {/* The first nav bar styling */}
            <Navbar className="navbar-custom" expand="md" id="first-navbar" variant="dark">
                <Container>
                    {/* Order: https://stackoverflow.com/questions/53695359/collapsing-navbar-moves-uncollapsable-items-away-from-navbar */}
                    <Navbar.Toggle className="ml-auto order-1" aria-controls="navBarContent" />
                    <Navbar.Collapse id="navBarContent" className="order-2">
                        <Nav className="mr-auto">
                            <Nav.Link id='home' href="/" >Home</Nav.Link>
                            <Nav.Link id='faculty' href="/facultyDirectory">Faculty</Nav.Link>
                          {user &&  <Nav.Link id='dashboard' href="/dashboard">Dashboard</Nav.Link> }
                            <Nav.Link id='help' target="_blank" href='https://drive.google.com/file/d/1P4T0Q2TVONEr5h6impU1d6r-9EcihvGE/view?usp=sharing'>Help</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    {/* If a user is logged in, they will see their profile image */}
                    <div className="ms-auto d-flex align-items-center photo-order">
                        {(user) ? (
                            <>
                                <NavDropdown
                                    title={
                                        <div>
                                            <ProfileImage size='60px' position='mx-auto' image={user.photoURL} />
                                        </div>
                                    }
                                    id="basic-nav-dropdown"
                                    className='no-indicator-dropdown'>
                                    <NavDropdown.Item color='red' className='drop-down-item'>
                                        <h3 className='text' id='logOutButton' onClick={logOut}>Log Out</h3>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            //  If a user is not logged in, they will see the log in button 
                            <div className='mr-auto'>
                                <Button className="logInButton" id='login-button' onClick={() => {
                                    const auth = getAuth(FireBaseApp);
                                    const provider = new GoogleAuthProvider();
                                    signInWithRedirect(auth, provider);
                                }}>
                                    Log In
                                </Button>
                            </div>
                        )}
                    </div>
                </Container>
            </Navbar>
            {/* The second nav bar styling */}
            <Navbar expand="sm" className="second-navbar" id="second-navbar" style={{ display: 'block' }}>
                <Container>
                    <Navbar.Brand target='_blank' href="https://www.merrimack.edu/academics/engineering-and-computational-sciences/computer-and-data-sciences/faculty-staff/">
                        <img className="logo" src={merrimackLogo} alt='Merrimack College Logo' />
                    </Navbar.Brand>
                    <div>
                        <Button className="searchBarToggle" onClick={toggleSearch} id="searchBarToggle">
                            <i className={isFocused ? "bi bi-x" : "bi bi-search"} aria-label='Search Icon'></i>
                        </Button>
                    </div>
                </Container>
                {/* Won't display the search bar until the search icon is clicked */}
                <div id="searchBar-container" style={{ display: 'none' }}>
                    <div className="input-group searchBar">
                        <InputGroup className='container'>
                            <FormControl id="search-Bar"
                                className='search-text'
                                placeholder="What would you like to search for?"
                                aria-label="Search Bar"
                                ref={searchBarRef}
                            />
                            <Button className="searchButton">
                                <i className={"bi bi-search"} id='searchIcon' style={{ fontSize: '25px' }} onClick={search} aria-label='Search Icon'></i>
                            </Button>
                        </InputGroup>
                    </div>
                </div>
            </Navbar>
        </nav >
    );
}


export default NavBar
