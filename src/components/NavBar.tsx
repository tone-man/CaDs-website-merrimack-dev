import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Container, DropdownButton, Dropdown, FormControl, InputGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../css/navBar.css';
import FireBaseApp from '../firebase';
import ProfileImage from './ProfileImage';
import merrimackLogo from '../imgs/logo.webp';
import { getAuth, signInWithRedirect, signOut, GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../App';

// Component to create the nav bar
function NavBar() {
    // Declare useState variables and useRef variables
    const [isFocused, setIsFocused] = useState(false);
    const user = useContext(AuthContext);
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
    function logOut(){

        const auth = getAuth(FireBaseApp);
        
        signOut(auth).then(() => {
            // Sign-out successful. Generate a toast
          }).catch((error) => {
            // An error happened. Cenerate a toast
          });
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
            <Navbar className="navbar-custom" id="first-navbar">
                <Container>
                    <Navbar.Toggle className="ms-auto" aria-controls="navBarContent" />
                    <Navbar.Collapse id="navBarContent">
                        <Nav className="mr-auto">
                            <Nav.Link id='home' href="/" >Home</Nav.Link>
                            <Nav.Link id='faculty' href="/faculty">Faculty</Nav.Link>
                            <Nav.Link id='dashboard' href="/dashboard">Dashboard</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            {/* If a user is logged in, they will see their profile image */}
                            {(user != null) ? (
                                <>
                                    <NavDropdown
                                        title={
                                            <div className="pull-right">
                                                <ProfileImage size='60px' position='mx-auto' image={user.photoURL} />
                                            </div>
                                        }
                                        id="basic-nav-dropdown"
                                        className='no-indicator-dropdown '>
                                        <NavDropdown.Item  color='red' className='drop-down-item'>
                                           <h3 className='text' id = 'logOutButton' onClick={logOut}>Log Out</h3>
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
                        </Nav>
                    </Navbar.Collapse>
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
