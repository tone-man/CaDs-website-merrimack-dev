import { Container, Row, Col } from 'react-bootstrap'
import ProfileImage from './ProfileImage'
import '../css/facultyMemberPage.css'

interface headerProps {
    departmentName: string,
    facultyName: string,
    facultyTitle: string,
    profileImg: string,

}

function FacultyMemberHeader(myProps: headerProps) {
  return (
    <div>
      <Container fluid className="faculty-header-container">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="department-name"> {myProps.departmentName}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="faculty-name">  <span>{myProps.facultyName}</span></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="faculty-title">{myProps.facultyTitle}</h1>
                        </Col>
                    </Row>
                    <Row className='image-row' >
                        <Col className="faculty-col">
                            <a href="/facultyDirectory">
                                <h1 className="return-to-directory-text">
                                    <i className="bi bi-chevron-left"></i>
                                    Return to Faculty Directory
                                </h1>
                            </a>
                        </Col>
                        <Col>
                            <ProfileImage size={'200px'} position="mx-auto" />
                        </Col>
                    </Row>
                </Container>
            </Container>
    </div>
  )
}

export default FacultyMemberHeader
