import { Container, Row, Col, Form, FormControl, InputGroup, Button } from "react-bootstrap";
import '../css/facultyDirectory.css';
import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import FacultyMemberDirectory, { facultyMember } from "./FacultyMemberDirectory";
import { getDatabase, ref, onValue } from "firebase/database";
import FireBaseApp from "../firebase";
import User from "../firebase/user";

// Faculty Directory components
function FacultyDirectory() {

    const searchBarRef = useRef<HTMLInputElement | null>(null);
    const [usersList, setUsersList] = useState<User[] | null>([]);
    const [visibleUsers, setVisibleUsers] = useState<User[] | null>(usersList);


    // gets the list of users from the database (ADMIN ONLY FEATURE)
    useEffect(() => {
        const db = getDatabase(FireBaseApp);
        // Get the references to users and pending users
        const usersRef = ref(db, `/users`);
        // const pendingUsersRef = ref(db, '/pendingUsers');

        // Stores a listener for the database in a useState variable
        onValue(usersRef, (snapshot) => {
            const users: User[] = [];
            snapshot.forEach((child) => {
                const { email, name, photoURL, userLevel, phoneNumber, title, pronouns, department, location } = child.val();
                users.push(new User(child.key, email, name, photoURL, userLevel, phoneNumber, title, pronouns, department, location));
            });

            setUsersList(users);
            setVisibleUsers(users);
        })
    }, []);

    // Search function for faculty members
    function search() {
        if (searchBarRef.current) {
            const searchElement = searchBarRef.current.value.trim().toLowerCase();
            const foundUsers = facultyArray.filter(user => user.name.toLowerCase().includes(searchElement));
            setVisibleUsers(foundUsers);
        }
    }
    return (
        <div>
            <Header img={'src/imgs/OBCenter.jpg'} title='Faculty Directory' />
            <Container className="faculty-page">
                <Row>
                    {/* Search Bar */}
                    <div className="input-group search-bar">
                        <Form.Label><h2 className='extraSmallFont metropolisBold'>Search By Keyword</h2></Form.Label>
                        <InputGroup>
                            <FormControl id="searchBar"
                                className="entered-text"
                                placeholder="Search.."
                                aria-label="Search Bar"
                                ref={searchBarRef}
                                onChange={search}
                                style={{ height: '50px', border: '1px black solid' }}
                            />
                        </InputGroup>
                    </div>
                </Row>
                {/* Results Number */}
                <Row style={{ paddingBottom: '75px' }}>
                    <Col md={6} sm={6} xs={6} className="resultsInfo">
                        <Button> {visibleUsers.length}</Button>
                    </Col>
                    <Col md={6} sm={6} xs={6} style={{ margin: 'auto' }}>
                        <h1 className="smallFont metropolisRegular"> Results</h1>
                    </Col>
                </Row>
                <Container style={{ paddingBottom: '50px' }}>
                    {
                        // Maps each of the visible faculty members to an individual faculty member component
                        visibleUsers.map((faculty, index) => (
                            <FacultyMemberDirectory key={index}
                                facultyMember={faculty}
                                isLast={index === visibleUsers.length - 1 ? true : false}
                            />
                        ))
                    }
                </Container>
            </Container>
        </div>
    )
}

export default FacultyDirectory
