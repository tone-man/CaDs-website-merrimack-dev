import { Container, Row, Col, Accordion } from "react-bootstrap"
import '../css/facultyMemberPage.css'
import ProfileImage from "../components/ProfileImage"
function FacultyPage() {

    return (
        <div>
            <Container fluid className="faculty-header-container">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="department-name"> Computer and Data Science Department</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="faculty-name">  <span>Dr. Melissa St. Hilaire</span></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="faculty-title"> Assistant Professor of Molecular and Cellular Biology</h1>
                        </Col>
                    </Row>
                    <Row className='image-row' >
                        <Col className="faculty-col">
                            <a href="/faculty">
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



            <Container className="faculty-body-container">
                <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="label"><span> Introduction</span></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="body-text"> My works in progress include analysis of interviewees’ media marathoning experiences while ill, as well as qualitative and quantitative studies about podcast listeners’ gratifications (conducted with colleagues Jacob Turner and Andrew Tollison, with help from students Sarah Seero and Kenney Tran).</h1>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="label"><span> Research Summary</span></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="body-text"> My works in progress include analysis of interviewees’ media marathoning experiences while ill, as well as qualitative and quantitative studies about podcast listeners’ gratifications (conducted with colleagues Jacob Turner and Andrew Tollison, with help from students Sarah Seero and Kenney Tran).</h1>
                        </Col>
                    </Row>
                </Container> <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="label"><span> Research Interests</span></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1 className="body-text"> My works in progress include analysis of interviewees’ media marathoning experiences while ill, as well as qualitative and quantitative studies about podcast listeners’ gratifications (conducted with colleagues Jacob Turner and Andrew Tollison, with help from students Sarah Seero and Kenney Tran).</h1>
                        </Col>
                    </Row>
                </Container>
                {/* <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="label">Contact Information</h1>
                        </Col>
                    </Row>
                    <Row className="container">
                        <Col md={1} sm={1} xs={2}>
                            <i className="bi bi-telephone-fill icon"></i>
                        </Col>
                        <Col md={11} sm={11} xs={10}>
                            <h1 className="contact-text"  > 978-XXX-XXXX</h1>
                        </Col>
                    </Row>
                    <Row className="container">
                        <Col md={1} sm={1} xs={2}>
                            <i className="bi bi-envelope-fill icon"></i>
                        </Col>
                        <Col md={11} sm={11} xs={10}>
                            <h1 className="contact-text" > email@merrimack.edu</h1>
                        </Col>
                    </Row>
                    <Row className="container">
                        <Col md={1} sm={1} xs={2}>
                            <i className="bi bi-building-fill icon"></i>
                        </Col>
                        <Col md={11} sm={11} xs={10}>
                            <h1 className="contact-text"> 315 engineering building</h1>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <Col>
                            <h1 className="label">Publications</h1>
                        </Col>
                    </Row>
                    <Row className="container">
                        <a href="/">
                            <h1 className="publications-text">  Publication 1</h1>
                        </a>
                    </Row>
                    <Row className="container">
                        <a href="/">
                            <h1 className="publications-text">  Publication 1</h1>
                        </a>
                    </Row>
                    <Row className="container">
                        <a href="/">
                            <h1 className="publications-text">  Publication 1</h1>
                        </a>
                    </Row>
                </Container> */}

                <Container >
                    <Accordion className="accordion-container">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <h4 className="accordion-header">Accordion Item #1 </h4></Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Accordion className="accordion-container">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <h4 className="accordion-header">Accordion Item #1 </h4></Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Accordion className="accordion-container">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <h4 className="accordion-header">Accordion Item #1 </h4></Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Accordion className="accordion-container">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <h4 className="accordion-header">Accordion Item #1 </h4></Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Accordion className="accordion-container">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header  >

                                <h4 className="accordion-header">Accordion Item #1 </h4></Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
            </Container>

        </div >
    )
}

export default FacultyPage
