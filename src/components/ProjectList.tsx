import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Col, Row, Button } from 'react-bootstrap';
import ProjectCard, { myProjectProps } from './ProjectCard';
import '../css/universal.css'
import '../css/ProjectList.css'
import Header from './Header';
import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';


interface projectProps {
    projectArray: myProjectProps[];
}

// This component actually creates the project list component and populates it with projects
function ProjectList(myProps: projectProps) {

    console.log(myProps.projectArray.length, 'length')
    const navigate = useNavigate();
    
    // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
    // Routes user to the edit page from the home page & passes optional param to  page as well
    const handleEditButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        navigate('/edit', { state: { pathName: 'pages/homepage/components' } });
    };


    return (
        <>
            <Header img={'src/imgs/OBCenter.jpg'} title='Faculty Led Projects' />
            <Container fluid style={{ background: 'rgb(224, 224, 224)' }}>
                <Container className='projects-container'>
                    <Row>
                        {/* Edit button. TODO: Render conditionally based on ownership */}
                        <Col md={12} style={{ textAlign: 'right' }} className='edit-button'>
                           <Button onClick={handleEditButtonClick}>Edit Page</Button>
                        </Col>
                    </Row>
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
                            <ProjectCard key={index}
                                imageDescription={projects.imageDescription}
                                projectLink={projects.projectLink}
                                description={projects.description}
                                title={projects.title}
                                imageAlt={projects.imageAlt}
                                number={index}
                                facultyMembers={projects.facultyMembers}
                                contributers={projects.contributers}
                            />
                        ))
                    }
                </Container >
            </Container>
        </>
    )
}

export default ProjectList
