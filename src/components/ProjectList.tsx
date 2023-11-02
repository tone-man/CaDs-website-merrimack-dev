import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Col, Row } from 'react-bootstrap';
import ProjectCard, { myProjectProps } from './ProjectCard';
import { facultyMembers } from './FacultyCarousel';
import '../css/universal.css'
import '../css/ProjectList.css'
import Header from './Header';

// Create an empty array of project component.
export const projectsArray: myProjectProps[] = [];

//Create an array of faculty member objects
const facultyArray: facultyMembers[] = [
    { facultyName: 'Faculty 1', facultyImg: 'img1.jpg' },
    { facultyName: 'Faculty 2', facultyImg: 'img2.jpg' },
];

//Create dummy data that will populate the content of the project components
//TODO: Actually load this information in from the database
const projectValues = [['Rove - Photography Exploration App for iOS', 'ROVE is a photo location sharing and tagging app for iOS devices that allows users to upload geotagged photos, tag them with keywords and search for prime photography spots.', 'Image Description', '/example', 'imageAlt'],
['Automated Lyric Analysis', 'Did musical lyrics get less sophisticated over time? This project used computational tools to analyze the lyrical sophistication of the Billboard top 100 from 1959 – 2016.', 'Image Description', '/example', 'imageAlt,'],
['D&D Roleplaying Group/Campaign Manager', 'Student built a website that acts as a group manager for tabletop role-playing games like Dungeons & Dragons.Student built a website that acts as a group manager for tabletop role-playing games like Dungeons & Dragons', 'Image Description', '/example', 'imageAlt'],
['Square Swords 3D Fighting Game', 'This project is a 3D fighting game in which characters are made of small blocks called voxels. Characters are also attached to their weapons, which move independently of the characters themselves.', 'Image Description', '/example', 'imageAlt']];

//Function that creates and returns a project object
function makeProjectObject(
    title: string,
    description: string,
    imageDescription: string,
    projectLink: string,
    number: number,
    imageAlt: string,
    faculty: facultyMembers[]
): myProjectProps {
    return {
        title: title,
        description: description,
        imageDescription: imageDescription,
        projectLink: projectLink,
        number: number,
        imageAlt: imageAlt,
        faculty: faculty
    };
}

//Function that populates the projects array with project objects containing the dummy information
function makeProjects(projectsArray: myProjectProps[], projectValues: string[][], facultyArray: facultyMembers[]) {
    for (let i = 0; i < projectValues.length; i++) {
        projectsArray.push(makeProjectObject(projectValues[i][0], projectValues[i][1], projectValues[i][2], projectValues[i][3], i, projectValues[i][4], facultyArray));
    }
}

makeProjects(projectsArray, projectValues, facultyArray);

// This component actually creates the project list component and populates it with projects
function ProjectList() {
    return (
        <>
         <Header img={'src/imgs/OBCenter.jpg'} title='Faculty Led Projects' />
            <Container fluid style={{ background: 'rgb(224, 224, 224)' }}>
                <Container className='projects-container'>
                <Row>
                    {/* Header text */}
                    <Col md = {{span: 12}} style={{padding: '20px'}} className='black-color'>
                        <h1 className='metropolisBold uppercase'> Explore Our Faculty Led Projects</h1>
                        <h5 className='metropolisThin smallFont'> Learn about some of the amazing projects that faculty members 
                             from the Computer Science and Data Science department
                             have worked on in recent years. </h5>
                    </Col>
                </Row>
                    {
                        // Maps each of the project elements in the projects array to a project card
                        projectsArray.map((projects, index) => (
                            <ProjectCard key={index}
                                imageDescription={projects.imageDescription}
                                projectLink={projects.projectLink}
                                description={projects.description}
                                title={projects.title}
                                imageAlt={projects.imageAlt}
                                number={projects.number}
                                faculty={projects.faculty}
                            />
                        ))
                    }
                </Container >
            </Container>
        </>
    )
}

export default ProjectList
