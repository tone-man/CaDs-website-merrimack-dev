import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react';
import WhiteListIndividual, { userProps } from './WhiteListIndividual';
import AddUserModal from './AddUserModal';
import '../css/requestSection.css'
import '../css/whiteListSection.css'
import User, { UserInterface } from '../firebase/user';
import { getDatabase, ref, remove } from 'firebase/database';
import FireBaseApp from '../firebase';

// This component creates the basic container for those on the whitelist
function WhiteListSection(userArray: UserInterface[]) {

    const searchBarRef = useRef<HTMLInputElement | null>(null);
    const [filterUserList, setFilterUserList] = useState(userArray);
    const [userList, setUserList] = useState(userArray);

    useEffect(() => {
        setUserList(userArray.userArray);
        setFilterUserList(userArray.userArray);
    }, [userArray]);


    // Search function for whitelist
    function search() {
        if (searchBarRef.current) {
            const searchElement = searchBarRef.current.value.trim().toLowerCase();
            const foundUsers = userList.filter(user => user.userName.toLowerCase().includes(searchElement));
            setFilterUserList(foundUsers);
        }
    }

    // Deletes user from whitelist
    // TODO: Pass deleted user info back to database
    function deleteUser(id: string) {
        const db = getDatabase(FireBaseApp);
        remove(ref(db, `users/${id}`));
    }

    // Adds user to the whitelist. 
    //TODO: Actually pass this information back to database
    function addUser(name: string, email: string, image: string) {
        // https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
        const newID = userList.length > 0 ? (Math.max(...userList.map(user => user.id)) + 1) : 0;
        const newUser: userProps = { userImage: image, userEmail: email, userName: name, id: newID };
        setUserList([newUser, ...userList]);
    }

    // Edits user information in the whitelist
    // TODO: Pass edited user information back to database
    function editUser(id: string, name: string, email: string, image: string | undefined) {
        if (image != undefined) {
            setUserList(prevUsers => {
                const updatedUsers = prevUsers.map(user => (user.id === id ? { ...user, userName: name, userEmail: email, userImage: image } : user));
                return updatedUsers;
            });
        }
        else {
            setUserList(prevUsers => {
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
                            {filterUserList.length > 0 ? (
                                // Maps each user  in the array to a whitelist 
                                filterUserList.map((user, index) => (
                                    <div key={index} style={index !== filterUserList.length - 1 || filterUserList.length < 3 ? { borderBottom: '1px black solid' } : {}}>
                                        <WhiteListIndividual onDelete={() => deleteUser(user.id)} onEdit={editUser} user={user} />
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