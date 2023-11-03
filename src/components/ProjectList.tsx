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
    const [snapshotTemp, setSnapshot] = useState([])


    useEffect(() => {
        const db = getDatabase();
        const projects = ref(db, 'pages/homepage/components/0/projectList');
        const arr: myProjectProps[] = [];
        onValue(projects, (snapshot) => {
            setSnapshot(snapshot.val());



            let number = 0;
            console.log('string', snapshot.val())
            //     for (const [key, value] of Object.entries(snapshot.val())) {


            //         const project = value;
            //         const facultyArray = [];
            //         const contributersArr=[];

            //         // Accessing contributors object and converting it into an array
            //         for (const facultyKey in project.facultyMembers) {
            //             // console.log(facultyKey)
            //             const facultyMember = project.facultyMembers[facultyKey];
            //             facultyArray.push({
            //                 facultyName: facultyMember.facultyName,
            //                 facultyImg: facultyMember.facultyImg,
            //             });
            //         }

            //          // Accessing contributors object and converting it into an array
            //          for (const contributerKey in project.contributers) {
            //             // console.log(contributerKey)
            //             const contributer = project.contributers[contributerKey];
            //             contributersArr.push({
            //                 name: contributer.name,
            //                 description: contributer.description,
            //             });
            //         }


            //         const newObj = makeProjectObject(project.title, project.description, project.imageDescription, project.projectLink, number, project.imageAlt, facultyArray, contributersArr);


            //         console.log('Projects Array:', newObj);
            //         arr.push(newObj);
            //         number++;
            //     }
            //     console.log('LENGTH',arr.length);
            //     setProjectsArray(arr);
        });
    }, []);

    useEffect(() => {
        console.log('temp', snapshotTemp);
        let number = 0;
        const arr: myProjectProps[] = [];
        for (const [key, value] of Object.entries(snapshotTemp)) {


            const project = value;
            const facultyArray = [];
            const contributersArr = [];
            console.log('value', project)

            // Accessing contributors object and converting it into an array
            for (const facultyKey in project.facultyMembers) {
                // console.log(facultyKey)
                const facultyMember = project.facultyMembers[facultyKey];
                facultyArray.push({
                    facultyName: facultyMember.facultyName,
                    facultyImg: facultyMember.facultyImg,
                });
            }

            // Accessing contributors object and converting it into an array
            for (const contributerKey in project.contributers) {
                // console.log(contributerKey)
                const contributer = project.contributers[contributerKey];
                contributersArr.push({
                    name: contributer.name,
                    description: contributer.description,
                });
            }

            const newObj = makeProjectObject(value.title, value.description, value.imageDescription, value.projectLink, number, value.imageAlt, facultyArray, contributersArr);
            arr.push(newObj);

            number++;
            
        }
        setProjectsArray(arr);
    }, [snapshotTemp]);




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
