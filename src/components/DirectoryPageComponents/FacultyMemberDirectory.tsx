import { Container, Row, Col, Button } from "react-bootstrap"
import { Navigate, useNavigate } from "react-router-dom"
import '../../css/DirectoryCSS/facultyMemberDirectory.css'

import ProfileImage from "../ProfileImage";

export interface facultyMember {
    id: string,
    name: string,
    phoneNumber: string,
    email: string,
    department: string,
    pronouns: string,
    title: string,
    pageLink?: string,
    photoURL: string
}

interface FacultyMemberDirectoryProps {
    facultyMember: facultyMember;
    isLast: boolean
}

// Creates an individual faculty member component for the faculty directory
function FacultyMemberDirectory(props: FacultyMemberDirectoryProps) {


    const { facultyMember, isLast } = props;
    const navigate = useNavigate();

    facultyMember.pageLink == '/faculty'

    return (
        <Container className="faculty-directory" style={isLast === true ? { borderBottom: '1px black solid' } : {}}>
            <Row >
                <Col md={6} sm={12}>
                    {/* Profile image, title, and name */}
                    <Container className="profile-container text">
                        <ProfileImage size="100px" position="mx-auto" image={facultyMember.photoURL} />
                        <h1 className="name"> {facultyMember.name}</h1>
                        <h1 className="title"> {facultyMember.title}</h1>
                        <h1 className="pronouns"> {facultyMember.pronouns}</h1>
                    </Container>
                </Col>
                <Col md={4} sm={8} xs={8} >
                    {/* Department and contact information*/}
                    <Container className="information-container">
                        <div className="position">
                            <h1 className="title"> Department</h1>
                            <h1 className="context"> {facultyMember.department}</h1>
                        </div>
                        <div className="position">
                            <h1 className="title"> Phone Number</h1>
                            <h1 className="context"> {facultyMember.phoneNumber}</h1>
                        </div>
                        <div className="position">
                            <h1 className="title"> Email</h1>
                            <h1 className="context"> {facultyMember.email}</h1>
                        </div>
                    </Container>
                </Col>
                {/* Link to faculty members page*/}
                <Col style={{ margin: 'auto' }} md={2} sm={4} xs={4}>
                        <Button className='link-button' onClick={() => navigate("/faculty", { state: { id: facultyMember.id}})}>
                                <i className="bi bi-arrow-right"></i>
                        </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default FacultyMemberDirectory
