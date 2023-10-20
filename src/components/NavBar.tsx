import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useRef, useState } from 'react';
import { Button, Container, FormControl, InputGroup , Nav, Navbar} from 'react-bootstrap';
import '../css/navBar.css';
import ProfileImage from './ProfileImage';
import merrimackLogo from '../imgs/logo.webp';

const NavBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const searchBarRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const searchBar = document.getElementById('searchBar');
        if (searchBar && searchBar.style.display === 'none') {
            searchBar.style.display = 'block';
        }
        else if (searchBar && searchBar.style.display === 'block') {
            searchBar.style.display = 'none';
        }
    }, [isFocused]);

    function toggleSearch() {
        setIsFocused(!isFocused);
    }

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
    useEffect(() => {
        // Function that makes the secondary nav bar "sticky"
        function handleScroll() {
            // Get the second navbar element by its ID
            const secondNavbar = document.getElementById('secondNavBar');

            if (secondNavbar) {
                const stickyPoint = secondNavbar?.getBoundingClientRect().top;
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
            <Navbar expand="lg" className="navbar-custom">
                <Container>
                    <Navbar.Toggle className="ms-auto" aria-controls="navBarContent" />
                    <Navbar.Collapse id="navBarContent">
                        <Nav className="mr-auto">
                            <Nav.Link href="#" >Home</Nav.Link>
                            <Nav.Link href="#">Faculty</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            {isLoggedIn ? (
                                <Nav.Link href="#">
                                 <ProfileImage size='50px'/>
                                </Nav.Link>
                            ) : (
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

            <Navbar expand="sm" className="second-navbar" id="secondNavBar" style={{ display: 'block' }}>
                <div className="container">
                    <Navbar.Brand href="#">
                        <img className="logo" src={merrimackLogo} alt='Merrimack College Logo' />
                    </Navbar.Brand>
                    <div>
                        <Button className="searchBarToggle" onClick={toggleSearch}>
                            <i className={isFocused ? "bi bi-x" : "bi bi-search"}></i>
                        </Button>
                    </div>
                </div>
                <div id="searchBar" style={{ display: 'none' }}>
                    <div className="input-group searchBar">
                        <InputGroup className='container'>
                            <FormControl id="searchBar"
                                placeholder="Search.."
                                aria-label="Search"
                                ref={searchBarRef} 
                            />
                            <Button className="searchIcon">
                                <i className={"bi bi-search"} style={{ fontSize: '25px' }} onClick={search}></i>
                            </Button>
                        </InputGroup>
                    </div>
                </div>
            </Navbar>
        </nav>
    );
}


export default NavBar
