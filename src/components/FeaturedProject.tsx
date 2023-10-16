import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Container } from 'react-bootstrap';

import '../css/FeaturedProject.css'

import ProjectCardL, { myProjectProps } from './ProjectCardL';

const projectsArray: myProjectProps[] = [];

const projectValues = [['CaDS Website Project 1', 'Description', 'Image Description', '#', 'imageAlt'],
['CaDS Website Project 2', 'Description', 'Image Description', '#', 'imageAlt'],
['CaDS Website Project 3', 'Description', 'Image Description', '#', 'imageAlt'],
['CaDS Website Project 4', 'Description', 'Image Description', '#', 'imageAlt']];

function makeEventObject(
    title: string,
    description: string,
    imageDescription: string,
    projectLink: string,
    number: number,
    imageAlt: string,): myProjectProps {
    return {
        title: title,
        description: description,
        imageDescription: imageDescription,
        projectLink: projectLink,
        number: number,
        imageAlt: imageAlt
    };
}

function makeProjects(projectsArray: myProjectProps[], projectValues: string[][]) {
    for (let i = 0; i < projectValues.length; i++) {
        projectsArray.push(makeEventObject(projectValues[i][0], projectValues[i][1], projectValues[i][2], projectValues[i][3], i, projectValues[i][4]));
    }
}

makeProjects(projectsArray, projectValues);

function FeaturedProject() {
    return (
        <>
            <Container fluid className='projects-container'>
                {
                    projectsArray.map(projects =>
                        <ProjectCardL
                            imageDescription={projects.imageDescription}
                            projectLink={projects.projectLink}
                            description={projects.description}
                            title={projects.title}
                            imageAlt={projects.imageAlt}
                            number={projects.number} />
                    )
                }
            </Container >
        </>
    )
}

export default FeaturedProject
