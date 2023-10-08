import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
import "bootstrap-icons/font/bootstrap-icons.css"; <>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"></link>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
</>
import merrimackLogo from '../imgs/logo.webp';
import './navBar.css';


const NavBar = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    // https://codesandbox.io/s/position-fixed-on-scroll-bqcl2?file=/src/App.js:811-820
    useEffect(() => {
        // Function that makes the secondary nav bar "sticky"
        function handleScroll() {
            // Get the second navbar element by its ID
            const secondNavbar = document.getElementById('secondNavBar');
            const stickyPoint = secondNavbar?.getBoundingClientRect().top;
            if (stickyPoint < window.scrollY) {
                secondNavbar.style.position = "fixed";
            } else {
                secondNavbar.style.position = "relative";

            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-custom">
                <div className="container">
                    <button className="navbar-toggler ms-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                        </span>
                    </button>
                    <div className="collapse navbar-collapse .mb-14" id="navbarSupportedContent">
                        <div className="container">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Faculty</a>
                                </li>
                                <div className="ms-auto">
                                    {isLoggedIn ? (
                                        <div className="rounded-circle overflow-hidden " style={{ width: '50px', height: '50px' }}>
                                            <img
                                                src={merrimackLogo}
                                                alt="Profile Picture"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                    ) : (
                                        <Button className="logInButton" onClick={function login() {
                                            setIsLoggedIn(true)
                                        }}>Log In</Button>
                                    )}
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <nav className="navbar second-navbar navbar-expand-sm navbar-light ms-auto container-fluid" id="secondNavBar" style={{ display: 'block' }}>

                <div className="container">
                    <a className="navbar-brand ml-lg-auto pr-lg-5" href="#"> <img className="logo" src={merrimackLogo} alt='Merrimack College Logo' /> </a>
                    <div className='ms-auto'>
                        <Button className="searchIcon" onFocusCapture={toggleSearch}>
                            <i className={"bi bi-search"}></i>
                        </Button>
                    </div>
                </div>
                <div className='container-fluid' id="searchBar" style={{ display: 'none' }}>
                    <div className="input-group searchBar ms-auto " style={{ display: 'flex' }}>
                        <div className="form-outline" >
                            <input type="search" id="form1" className="form-control" placeholder='Search..' />
                        </div>
                        <Button className="searchIcon2">
                            <i className={"bi bi-search"}></i>
                        </Button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
