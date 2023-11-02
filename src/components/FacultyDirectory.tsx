import { Container, Row, Col, Form, FormControl, InputGroup, Button } from "react-bootstrap";
import '../css/facultyDirectory.css';
import Header from "./Header";
import { useRef, useState } from "react";
import FacultyMemberDirectory, {facultyMember}from "./FacultyMemberDirectory";


//Create an array of faculty member objects
const facultyArray: facultyMember[] = [
    { name: 'John Doe', phoneNumber: 'XXX-123-4567', email: 'email@example.com', department: 'computer and Data Science'
    , pronouns: 'she/her/hers', title: 'assistant professor of the Department of Computer and Data Sciences', pageLink:'/'},
    { name: 'Dr. Melissa St. Hilaire', phoneNumber: 'XXX-123-4567', email: 'email@example.com', department: 'computer and Data Science'
    , pronouns: 'she/her/hers', title: 'assistant professor of the Department of Computer and Data Sciences', pageLink:'/'},
    { name: 'Dr. Christopher Stuetzle', phoneNumber: 'XXX-123-4567', email: 'email@example.com', department: 'computer and Data Science'
    , pronouns: 'she/her/hers', title: 'assistant professor of the Department of Computer and Data Sciences', pageLink:'/'},
    { name: 'Dr. Zachary Kissel', phoneNumber: 'XXX-123-4567', email: 'email@example.com', department: 'computer and Data Science'
    , pronouns: 'she/her/hers', title: 'assistant professor of the Department of Computer and Data Sciences', pageLink:'/'},
    { name: 'Dr. Melissa St. Hilaire', phoneNumber: 'XXX-123-4567', email: 'email@example.com', department: 'computer and Data Science'
    , pronouns: 'she/her/hers', title: 'assistant professor of the Department of Computer and Data Sciences', pageLink:'/'}
];

// Faculty Directory components
function FacultyDirectory() {

    const searchBarRef = useRef<HTMLInputElement | null>(null);
    const [visibleUsers, setVisibleUsers] = useState(facultyArray);

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
                <Row style={{paddingBottom: '75px'}}>
                    <Col md={6} sm={6}  xs = {6} className="resultsInfo">
                        <Button> {visibleUsers.length}</Button>
                    </Col>
                    <Col md={6} sm={6} xs = {6} style={{margin: 'auto'}}>
                        <h1 className="smallFont metropolisRegular"> Results</h1>
                    </Col>
                </Row>
                <Container style ={{paddingBottom: '50px'}}>
                {
                        // Maps each of the visible faculty members to an individual faculty member component
                        visibleUsers.map((faculty, index) => (
                            <FacultyMemberDirectory key={index}
                                facultyMember={faculty}
                                isLast={index=== visibleUsers.length-1 ? true : false}
                            />
                        ))
                    }
                    </Container>
            </Container>
        </div>
    )
}

export default FacultyDirectory
