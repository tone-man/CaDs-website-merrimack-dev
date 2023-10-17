import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Container } from 'react-bootstrap';

import '../css/FeaturedProject.css'

import ProjectCard, { myProjectProps, facultyMems} from './ProjectCard';

const projectsArray: myProjectProps[] = [];

const facultyArray: facultyMems[] = [
    { facultyName: 'Faculty 1', facultyImg: 'img1.jpg' },
    { facultyName: 'Faculty 2', facultyImg: 'img2.jpg' },
]; 

const projectValues = [['Rove - Photography Exploration App for iOS', 'ROVE is a photo location sharing and tagging app for iOS devices that allows users to upload geotagged photos, tag them with keywords and search for prime photography spots.', 'Image Description', '#', 'imageAlt'],
['Automated Lyric Analysis', 'Did musical lyrics get less sophisticated over time? This project used computational tools to analyze the lyrical sophistication of the Billboard top 100 from 1959 – 2016.', 'Image Description', '#', 'imageAlt,'],
['D&D Roleplaying Group/Campaign Manager', 'Student built a website that acts as a group manager for tabletop role-playing games like Dungeons & Dragons.' , 'Image Description', '#', 'imageAlt'],
['Square Swords 3D Fighting Game', 'This project is a 3D fighting game in which characters are made of small blocks called voxels. Characters are also attached to their weapons, which move independently of the characters themselves.', 'Image Description', '#', 'imageAlt']];


function makeEventObject(
    title: string,
    description: string,
    imageDescription: string,
    projectLink: string,
    number: number,
    imageAlt: string,
    faculty: facultyMems[]
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

function makeProjects(projectsArray: myProjectProps[], projectValues: string[][], facultyArray: facultyMems[] ) {
    for (let i = 0; i < projectValues.length; i++) {
        projectsArray.push(makeEventObject(projectValues[i][0], projectValues[i][1], projectValues[i][2], projectValues[i][3], i, projectValues[i][4], facultyArray));
    }
}

makeProjects(projectsArray, projectValues, facultyArray);

function ProjectList() {
    return (
        <>
            <Container fluid className='projects-container'>
                {
                    projectsArray.map(projects =>
                        <ProjectCard
                            imageDescription={projects.imageDescription}
                            projectLink={projects.projectLink}
                            description={projects.description}
                            title={projects.title}
                            imageAlt={projects.imageAlt}
                            number={projects.number}
                            faculty={projects.faculty}
                             />
                    )
                }
            </Container >
        </>
    )
}

export default ProjectList
