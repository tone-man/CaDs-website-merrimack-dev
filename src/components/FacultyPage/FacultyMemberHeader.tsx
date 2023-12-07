import { Container, Row, Col } from 'react-bootstrap'

import '../../css/DirectoryCSS/facultyMemberDirectory.css'

import ProfileImage from '../ProfileImage'


interface headerProps {
    departmentName: string,
    facultyName: string,
    facultyTitle: string,
    profileImg: string,

}

// Header that appears on the top of each faculty member's page
function FacultyMemberHeader(myProps: headerProps) {

  return (
    <div>
      <Container fluid className="faculty-header-container">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="department-name" dangerouslySetInnerHTML={{ __html: myProps.departmentName }}></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="faculty-name" style={{textDecoration: 'overline 3px yellow'}} dangerouslySetInnerHTML={{ __html: myProps.facultyName }}></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="faculty-title" dangerouslySetInnerHTML={{ __html: myProps.facultyTitle }}></h1>
                        </Col>
                    </Row>
                    <Row className='image-row'>
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
