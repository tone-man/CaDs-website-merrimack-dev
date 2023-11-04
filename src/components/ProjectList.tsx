import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Col, Row } from 'react-bootstrap';
import ProjectCard, { myProjectProps } from './ProjectCard';
import { facultyMembers } from './FacultyCarousel';
import { contributerProps } from './ProjectContributer';
import '../css/universal.css'
import '../css/ProjectList.css'
import { getDatabase, ref, onValue } from "firebase/database";
import Header from './Header';
import { useEffect, useState } from 'react';



// This component actually creates the project list component and populates it with projects
function ProjectList() {
    const [projectsArray, setProjectsArray] = useState<myProjectProps[]>([])
    const [snapshotTemp, setSnapshot] = useState<myProjectProps | object>({});

    //Function that creates and returns a project object
    function makeProjectObject(
        title: string,
        description: string,
        imageDescription: string,
        projectLink: string,
        number: number,
        imageAlt: string,
        faculty: facultyMembers[],
        contributers: contributerProps[]
    ): myProjectProps {
        return {
            title: title,
            description: description,
            imageDescription: imageDescription,
            projectLink: projectLink,
            number: number,
            imageAlt: imageAlt,
            facultyMembers: faculty,
            contributers: contributers
        };
    }


    // Gets the project information from the database
    useEffect(() => {
        const db = getDatabase();
        const projects = ref(db, 'pages/homepage/components/0/projectList');
        // Stores a listener for the database in a useState variable
        onValue(projects, (snapshot) => {
            setSnapshot(snapshot.val());
        });
    }, []);

    // Actually parses database information so it can be passed to other components
    useEffect(() => {
        let number = 0;
        const arr: myProjectProps[] = [];
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        // Iterates through project objects
        for (const [, value] of Object.entries(snapshotTemp)) {
            const project = value;
            const facultyArray = [];
            const contributersArr = [];

            // Acesses the facultyMember object and converts it into an array
            for (const facultyKey in project.facultyMembers) {
                const facultyMember = project.facultyMembers[facultyKey];
                facultyArray.push({
                    facultyName: facultyMember.facultyName,
                    facultyImg: facultyMember.facultyImg,
                });
            }

             // Acesses the contributors object and converts it into an array
            for (const contributerKey in project.contributers) {
                const contributer = project.contributers[contributerKey];
                contributersArr.push({
                    name: contributer.name,
                    description: contributer.description,
                });
            }

            // Creates a new project object and adds it to an array
            const newObj = makeProjectObject(value.title, value.description, value.imageDescription, value.projectLink, number, value.imageAlt, facultyArray, contributersArr);
            arr.push(newObj);
            number++;

        }
        // Sets the project array information to the array of project objects whose information we parsed
        setProjectsArray(arr);
    }, [snapshotTemp]);

    return (
        <>
            <Header img={'src/imgs/OBCenter.jpg'} title='Faculty Led Projects' />
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
                        projectsArray.map((projects, index) => (
                            <ProjectCard key={index}
                                imageDescription={projects.imageDescription}
                                projectLink={projects.projectLink}
                                description={projects.description}
                                title={projects.title}
                                imageAlt={projects.imageAlt}
                                number={projects.number}
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
