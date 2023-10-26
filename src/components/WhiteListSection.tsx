import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Container, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useRef, useState } from 'react';
import WhiteListIndividual, { userProps } from './WhiteListIndividual';
import '../css/requestSection.css'
import '../css/whiteListSection.css'


//Create an array of user objects for the whitelist
const userArray: userProps[] = [
    { userName: 'John Smith', userImage: 'img' },
    { userName: 'Melissa St. Hilaire', userImage: 'img' },
    { userName: 'Bree Van Hecke', userImage: 'img' },
    { userName: 'Antonio Craveiro', userImage: 'img' },
    { userName: 'Stuetzle', userImage: 'img' },
    { userName: 'Kissel', userImage: 'img' },
    { userName: 'Faculty Name', userImage: 'img' },
    { userName: 'Faculty Name 2', userImage: 'img' },
    { userName: 'Faculty Name 3', userImage: 'img' },
    { userName: 'Faculty Name 4', userImage: 'img' },
    { userName: 'Faculty Name 5', userImage: 'img' },
    { userName: 'Faculty Name 6', userImage: 'img' },
    { userName: 'Faculty Name 7', userImage: 'img' },
    { userName: 'Faculty Name 8', userImage: 'img' },
    { userName: 'Faculty Name 9', userImage: 'img' }
];


// This component creates the basic container for those on the whitelis
function WhiteListSection() {

    const searchBarRef = useRef<HTMLInputElement | null>(null);
    const [visibleUsers, setVisibleUsers] = useState(userArray);

    // Search function
    function search() {
        if (searchBarRef.current) {
            const searchElement = searchBarRef.current.value.trim().toLowerCase();
            const foundUsers = userArray.filter(user => user.userName.toLowerCase().includes(searchElement));
            setVisibleUsers(foundUsers);
        }
    }

    // Clears search and resets the visible users
    function clearSearch() {
        if (searchBarRef.current) {
            searchBarRef.current.value = '';
            setVisibleUsers(userArray);
        }

    }
    return (
        <div style={{ paddingBottom: '50px' }}>
            {/* White List Title and Add User section */}
            <Container>
                <div className='dashboard-whitelist-title'>
                    <Row style={{ paddingBottom: '20px' }}>
                        <Col className='title' >
                            <h1> WHITELIST</h1>
                        </Col >
                        <Col className='button' md={3} sm={5} xs={5}>
                            <i className="bi bi-plus icon" aria-label='Add User Icon' style={{ fontSize: '3rem' }}></i>
                        </Col>
                    </Row>
                </div>
            </Container >

            <Container>
                {/* Search Bar */}
                <div className="input-group search-bar">
                    <InputGroup className='container search-bar-style'>
                        <FormControl id="searchBar"
                            placeholder="Search.."
                            aria-label="Search Bar"
                            ref={searchBarRef}
                        />
                        {/* Searches for term */}
                        <Button className="searchIcon">
                            <i className={"bi bi-search"} style={{ fontSize: '2rem' }} onClick={search} aria-label='Search Bar Icon'></i>
                        </Button>
                        {/* Resets Search bar */}
                        <Button className="searchIcon">
                            <i className={"bi bi-x"} style={{ fontSize: '2rem' }} onClick={clearSearch} aria-label='Clear Search Bar Icon'></i>
                        </Button>
                    </InputGroup>
                </div>

                {/* Actual Container for the white list */}
                <div className='whitelist-container'>
                    <div className='scroll'>
                        {/* Display empty text if there are no whitelist users, otherwise display users */}
                        {visibleUsers.length > 0 ? (
                            // Maps each user  in the array to a whitelist 
                            visibleUsers.map((user) => (
                                <div className='cell'>
                                    <WhiteListIndividual userName={user.userName} userImage={user.userImage} />
                                </div>
                            ))
                        ) :
                            (
                                <h3 className='empty'> <i>Sorry! No users were found matching that search key</i></h3>
                            )
                        }
                    </div>
                </div>
            </Container >

        </div >
    )
}

export default WhiteListSection
