import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useRef, useState } from 'react';
import { Button, Container, FormControl, InputGroup , Nav, Navbar} from 'react-bootstrap';
import '../css/navBar.css';
import ProfileImage from './ProfileImage';
import merrimackLogo from '../imgs/logo.webp';

// Component to create the nav bar
function NavBar() {
    // Declare useState variables and useRef variables
    const [isFocused, setIsFocused] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const searchBarRef = useRef<HTMLInputElement | null>(null);

    // This useEffect displays/hides the search bar when isFocused changes
    useEffect(() => {
        const searchBar = document.getElementById('searchBar');
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

    // https://codesandbox.io/s/position-fixed-on-scroll-bqcl2?file=/src/App.js:811-820
    //Function that makes the secondary nav bar "sticky" and stick to the top of the page after scrolling
    useEffect(() => {
        function handleScroll() {
            // Get the second navbar element by its ID
            const secondNavbar = document.getElementById('secondNavBar');
           
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
            <Navbar className="navbar-custom">
                <Container>
                    <Navbar.Toggle className="ms-auto" aria-controls="navBarContent" />
                    <Navbar.Collapse id="navBarContent">
                        <Nav className="mr-auto">
                            <Nav.Link href="#" >Home</Nav.Link>
                            <Nav.Link href="#">Faculty</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                        {/* If a user is logged in, they will see their profile image */}
                            {isLoggedIn ? (
                                <Nav.Link href="#">
                                 <ProfileImage size='50px'/>
                                </Nav.Link>
                            ) : (
                               //  If a user is not logged in, they will see the log in button 
                                <div className='mr-auto'>
                                    <Button className="logInButton" onClick={() => setIsLoggedIn(true)}>
                                        Log In
                                    </Button>
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
               </Container>
            </Navbar>
            {/* The second nav bar styling */}
            <Navbar expand="sm" className="second-navbar" id="secondNavBar" style={{ display: 'block' }}>
               <Container>
                    <Navbar.Brand href="#">
                        <img className="logo" src={merrimackLogo} alt='Merrimack College Logo' />
                    </Navbar.Brand>
                    <div>
                        <Button className="searchBarToggle" onClick={toggleSearch}>
                            <i className={isFocused ? "bi bi-x" : "bi bi-search"} aria-label='Search Icon'></i>
                        </Button>
                    </div>
                </Container>
                 {/* Won't display the search bar until the search icon is clicked */}
                <div id="searchBar" style={{ display: 'none' }}>
                    <div className="input-group searchBar">
                        <InputGroup className='container'>
                            <FormControl id="searchBar"
                                placeholder="Search.."
                                aria-label="Search Bar"
                                ref={searchBarRef} 
                            />
                            <Button className="searchIcon">
                                <i className={"bi bi-search"} style={{ fontSize: '25px' }} onClick={search} aria-label='Search Icon'></i>
                            </Button>
                        </InputGroup>
                    </div>
                </div>
            </Navbar>
        </nav>
    );
}


export default NavBar
