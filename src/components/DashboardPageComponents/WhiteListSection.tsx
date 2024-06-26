import { Container, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react';
import WhiteListIndividual from './WhiteListIndividual';
import AddUserModal from '../Modals/AddUserModal';
import '../../css/dashboardCSS/requestSection.css'
import '../../css/dashboardCSS/whiteListSection.css'
import User, { UserInterface } from '../../firebase/user';
import { getDatabase, ref, remove, set } from 'firebase/database';
import FireBaseApp from '../../firebase';
import useToastContext from '../toasts/useToastContext';

interface whitelistProps {
    userArray:  UserInterface[];
}

// This component creates the basic container for those on the whitelist
function WhiteListSection(props: whitelistProps) {

    const searchBarRef = useRef<HTMLInputElement | null>(null);
    const [filterUserList, setFilterUserList] = useState<UserInterface[]>(props.userArray);
    const [userList, setUserList] = useState<UserInterface[]>(props.userArray);
    const addToast = useToastContext()

    useEffect(() => {
        setUserList(props.userArray);
        setFilterUserList(props.userArray);
    }, [props]);


    // Search function for whitelist
    function search() {
        if (searchBarRef.current) {
            const searchElement = searchBarRef.current.value.trim().toLowerCase();
            const foundUsers = userList.filter(user => user.name.toLowerCase().includes(searchElement));
            setFilterUserList(foundUsers);
        }
    }

    // Deletes user from whitelist
    // TODO: Pass deleted user info back to database
    function deleteUser(id: string, name: string) {
        const db = getDatabase(FireBaseApp);
        remove(ref(db, `users/${id}`));
        addToast(`Successfully removed user ${name} from users`, 'success')
    }

    // Edits user information in the whitelist
    // TODO: Pass edited user information back to database
    function editUser(user: User) {
        const db = getDatabase(FireBaseApp);
        set(ref(db, `users/${user.id}`), user.toFirebaseObject());
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
                                        <WhiteListIndividual onDelete={() => deleteUser(user.id, user.name)} onEdit={editUser} user={user} />
                                    </div>
                                ))
                            ) :
                                (<h3 className='empty'> <i>No users were found</i></h3>)
                            }
                        </div>
                    </div>

                    {/* Add user button */}
                    <div className='positioning'>
                        <AddUserModal />
                    </div>

                </div>
            </Container >
        </div >
    )
}

export default WhiteListSection