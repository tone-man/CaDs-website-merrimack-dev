import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Col, Row } from 'react-bootstrap';
import ProjectCard, { myProjectProps } from './ProjectCard';
import '../css/universal.css'
import '../css/ProjectList.css'


interface projectProps {
    projectArray: myProjectProps[];
}

// This component actually creates the project list component and populates it with projects
function ProjectList(myProps: projectProps) {
    return (
        <>
            <Container fluid style={{ background: 'rgb(224, 224, 224)' }}>
                <Container className='projects-container'>
              
                    <Row>
                        {/* Header text */}
                        <Col md={{ span: 12 }} style={{ padding: '20px' }} className='black-color'>
                            <h1 className='metropolisBold uppercase'> Explore Our Faculty Led Projects</h1>
                            <h5 className='metropolisThin smallFont'> Learn about some of the amazing projects that faculty members
                                from the Computer Science and Data Science department
                                have worked on in recent years. </h5>
                        </Col>
                    </Row>
                    {
                        // Maps each of the project elements in the projects array to a project card
                        myProps.projectArray.map((projects, index) => (
                            <ProjectCard
                                type={projects.type}
                                key={index}
                                imageDescription={projects.imageDescription}
                                projectLink={projects.projectLink}
                                description={projects.description}
                                title={projects.title}
                                imageAlt={projects.imageAlt}
                                number={index}
                                facultyMembers={projects.facultyMembers}
                                contributers={projects.contributers}
                                databaseKey={projects.databaseKey}
                            />
                        ))
                    }
                </Container >
            </Container>
        </>
    )
}

export default ProjectList
