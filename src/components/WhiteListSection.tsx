import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react';
import WhiteListIndividual, { userProps } from './WhiteListIndividual';
import AddUserModal from './AddUserModal';
import '../css/requestSection.css'
import '../css/whiteListSection.css'


//Create an array of user objects for the whitelist
const userArray: userProps[] = [
    { userName: 'John Smith', userEmail: 'johnsmith@gmail.com', userImage: 'img', id: 1 },
    { userName: 'Melissa St. Hilaire', userEmail: 'hilaire@edu.com', userImage: 'img', id: 2 },
    { userName: 'Bree Van Hecke', userEmail: 'vanheckeb@merrimack.edu', userImage: 'img', id: 3 },
    { userName: 'Antonio Craveiro', userEmail: 'craveiroa@merrimack.edu', userImage: 'img', id: 4 },
    { userName: 'Stuetzle', userEmail: 'stuetzle@gmail.com', userImage: 'img', id: 5 },
    { userName: 'Kissel', userEmail: 'kissel@gmail.com', userImage: 'img', id: 6 },
    { userName: 'Jane', userEmail: 'jane@gmail.com', userImage: 'img', id: 7 },
    { userName: 'Joe', userEmail: 'joe@gmail.com', userImage: 'img', id: 8 },
    { userName: 'Doe', userEmail: 'doe@gmail.com', userImage: 'img', id: 9 },
    { userName: 'Beverly', userEmail: 'bev@gmail.com', userImage: 'img', id: 10 },
    { userName: 'Charlie', userEmail: 'charlie@gmail.com', userImage: 'img', id: 11 },
    { userName: 'No one', userEmail: 'noone@gmail.com', userImage: 'img', id: 12 }
];


// This component creates the basic container for those on the whitelist
function WhiteListSection() {

    const searchBarRef = useRef<HTMLInputElement | null>(null);
    const [visibleUsers, setVisibleUsers] = useState(userArray);
    const [officialUsers, setOfficialUsers] = useState(userArray);

    useEffect(() => {
        setVisibleUsers(officialUsers);
    }, [officialUsers]);

    // Search function for whitelist
    function search() {
        if (searchBarRef.current) {
            const searchElement = searchBarRef.current.value.trim().toLowerCase();
            const foundUsers = officialUsers.filter(user => user.userName.toLowerCase().includes(searchElement));
            setVisibleUsers(foundUsers);
        }
    }

    // Deletes user from whitelist
    // TODO: Pass deleted user info back to database
    function deleteUser(id: number) {
        const keptUsers = officialUsers.filter(user => user.id !== id);
        setOfficialUsers(keptUsers);
    }

    // Adds user to the whitelist. 
    //TODO: Actually pass this information back to database
    function addUser(name: string, email: string, image: string) {
        // https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
        const newID = officialUsers.length > 0 ? (Math.max(...officialUsers.map(user => user.id)) + 1) : 0;
        const newUser: userProps = { userImage: image, userEmail: email, userName: name, id: newID };
        setOfficialUsers([newUser, ...officialUsers]);
    }

    // Edits user information in the whitelist
    // TODO: Pass edited user information back to database
    function editUser(id: number, name: string, email: string, image: string | undefined) {
        if (image != undefined) {
            setOfficialUsers(prevUsers => {
                const updatedUsers = prevUsers.map(user => (user.id === id ? { ...user, userName: name, userEmail: email, userImage: image } : user));
                return updatedUsers;
            });
        }
        else {
            setOfficialUsers(prevUsers => {
                const updatedUsers = prevUsers.map(user => (user.id === id ? { ...user, userName: name, userEmail: email } : user));
                return updatedUsers;
            });
        }

        
    }

    return (
        <div style={{ paddingBottom: '50px' }}>

            {/* White List Title*/}
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
                                onChange={search}
                                style={{ height: '50px', border: '1px black solid' }}
                            />
                        </InputGroup>
                    </div>

                    {/* Actual Container for the white list */}
                    <div className='whitelist-container'>
                        <div className='scroll'>
                            {/* Display empty text if there are no whitelist users, otherwise display users */}
                            {visibleUsers.length > 0 ? (
                                // Maps each user  in the array to a whitelist 
                                visibleUsers.map((user, index) => (
                                    <div style={index !== visibleUsers.length - 1 || visibleUsers.length < 3 ? { borderBottom: '1px black solid' } : {}}>
                                        <WhiteListIndividual onDelete={() => deleteUser(user.id)} onEdit={editUser} myProps={{ id: user.id, userName: user.userName, userEmail: user.userEmail, userImage: user.userImage }} />
                                    </div>
                                ))
                            ) :
                                (<h3 className='empty'> <i>No users were found</i></h3>)
                            }
                        </div>
                    </div>

                    {/* Add user button */}
                    <div className='positioning'>
                        <AddUserModal addUser={addUser} />
                    </div>

                </div>
            </Container >
        </div >
    )
}

export default WhiteListSection