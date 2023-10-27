import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Container, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useRef, useState } from 'react';
import WhiteListIndividual, { userProps } from './WhiteListIndividual';
import '../css/requestSection.css'
import '../css/whiteListSection.css'
import AddUserModal from './AddUserModal';


//Create an array of user objects for the whitelist
const userArray: userProps[] = [
    { userName: 'John Smith', userImage: 'img', id: 1 },
    { userName: 'Melissa St. Hilaire', userImage: 'img', id: 2 },
    { userName: 'Bree Van Hecke', userImage: 'img', id: 3 },
    { userName: 'Antonio Craveiro', userImage: 'img', id: 4 },
    { userName: 'Stuetzle', userImage: 'img', id: 5 },
    { userName: 'Kissel', userImage: 'img', id: 6 },
    { userName: 'Jane', userImage: 'img', id: 7 },
    { userName: 'Joe', userImage: 'img', id: 8 },
    { userName: 'Doe', userImage: 'img', id: 9 },
    { userName: 'Beverly', userImage: 'img', id: 10 },
    { userName: 'Charlie', userImage: 'img', id: 11 },
    { userName: 'No one', userImage: 'img', id: 12 }
];


// This component creates the basic container for those on the whitelist
function WhiteListSection() {

    const searchBarRef = useRef<HTMLInputElement | null>(null);
    const [visibleUsers, setVisibleUsers] = useState(userArray);
    const [officialUsers, setOfficialUsers] = useState(userArray);

    // Search function
    function search() {
        if (searchBarRef.current) {
            const searchElement = searchBarRef.current.value.trim().toLowerCase();
            const foundUsers = officialUsers.filter(user => user.userName.toLowerCase().includes(searchElement));
            setVisibleUsers(foundUsers);
        }
    }

    // Clears search and resets the visible users
    function clearSearch() {
        if (searchBarRef.current) {
            searchBarRef.current.value = '';
            setVisibleUsers(officialUsers);
        }
    }

    // Delete user if they are selected
    function deleteUser(id: number) {
        const keptUsers = officialUsers.filter(user => user.id !== id);
        setOfficialUsers(keptUsers);
        setVisibleUsers(keptUsers);
    }

    // Adds user. Doesn't let user customize new user info atm
    function addUser(name: string, image: string) {
        console.log('ADD USER FUNCTION')
        const newUser: userProps = { userImage: image, userName: name, id: 10 }
        setOfficialUsers([...officialUsers, newUser]);
        setVisibleUsers([...officialUsers, newUser]);
    }

    return (
        <div style={{ paddingBottom: '50px', background: 'lightgrey' }}>
            {/* White List Title and Add User section */}

            <Container>
                <div className='dashboard-whitelist-section'>
                    <Container>
                        <div className='dashboard-whitelist-title'>
                            <Row style={{ paddingBottom: '10px' }}>
                                <Col className='title' >
                                    <h1> WHITELIST</h1>
                                </Col >
                            </Row>
                        </div>
                    </Container >


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
                                visibleUsers.map((user, index) => (
                                    <div className='cell' style={index !== 0 ? { borderTop: '1px black solid' } : {}}>
                                        <WhiteListIndividual onDelete={() => deleteUser(user.id)} myProps={{ id: user.id, userName: user.userName, userImage: user.userImage }} />
                                    </div>
                                ))
                            ) :
                                (<h3 className='empty'> <i>No users were found</i></h3>)
                            }
                        </div>
                    </div>
                    {/* New Project Button */}
                    <div className='positioning'>
                        <AddUserModal addUser={addUser} />
                    </div>
                </div>
            </Container >

        </div >
    )
}

export default WhiteListSection
