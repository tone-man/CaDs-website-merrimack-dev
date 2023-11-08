import { getDatabase, ref, onValue, get, child } from 'firebase/database';
import { useState, useEffect } from 'react';
import EventsCarousel from '../components/EventsCarousel';
import { facultyMembers } from '../components/FacultyCarousel';
import { myProjectProps } from '../components/ProjectCard';
import { contributerProps } from '../components/ProjectContributer';
import ProjectList from '../components/ProjectList';
import { myEventProps } from '../components/Events';



const Home = () => {
    const [renderedComponents, setRenderedComponents] = useState<JSX.Element[]>([]);
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


    //Function that creates and returns an event object
    function makeEventObject(
        imgSource: string,
        imageAlt: string,
        caption: string,
        description: string,
        link: string,
        title: string,
        date: string,
        location: string): myEventProps {
        return {
            imgSource: imgSource,
            imageAlt: imageAlt,
            caption: caption,
            description: description,
            link: link,
            title: title,
            date: date,
            location: location
        };
    }



    // Gets all of the components that compose a home page from the database
    // https://firebase.google.com/docs/database/web/read-and-write
    useEffect(() => {
        const db = getDatabase();
        const projects = ref(db,'pages/homepage/components');

        // Stores a listener for the database in a useState variable
        onValue(projects, (snapshot) => {
            setSnapshot(snapshot.val());
            console.log(snapshot.val(), 'snapshot.val()');
        });
    }, []);

    // Actually parses database information so it can be converted into project list components
    useEffect(() => {

        const elements: unknown[] = [];
        console.log(elements, 'elements here');
        // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        // // Iterates through component objects
        for (const [, value] of Object.entries(snapshotTemp)) {

            const type = value.type;
            if (elements[value.pageOrder] === undefined) {
                elements[value.pageOrder] = [];
            }


            // If it is type project
            if (type.includes('project')) {
                const project = value;
                const facultyArray = [];
                const contributersArr = [];

                // Accesses the facultyMember object and convert it into an array
                for (const facultyKey in project.facultyMembers) {
                    const facultyMember = project.facultyMembers[facultyKey];
                    facultyArray.push({
                        facultyName: facultyMember.facultyName,
                        facultyImg: facultyMember.facultyImg,
                    });
                }

                // Accesses the contributors object and converts it into an array
                for (const contributerKey in project.contributers) {
                    const contributer = project.contributers[contributerKey];
                    contributersArr.push({
                        name: contributer.name,
                        description: contributer.description,
                    });
                }

                // // Creates a new project object and adds it to an array
                const newObj = makeProjectObject(value.title, value.description, value.imageDescription, value.projectLink, 0, value.imageAlt, facultyArray, contributersArr);
                elements[value.pageOrder][project.nestedOrder] = newObj;

            }
            else if (type.includes('event')) {
                const event = value;

                // Creates a new project object and adds it to an array
                const newObj = makeEventObject(event.imgSource, event.imageAlt, event.caption, event.description, event.link, event.title, event.date, event.location);
                elements[value.pageOrder][event.nestedOrder] = newObj;
            }
        }
        createRenderArray(elements);
    }, [snapshotTemp]);

    function createRenderArray(elements) {

        console.log(elements[1], 'ELEMENTS 1');
       
        const tempArr = [];
        for (let i = 0; i < elements.length; i++) {
            if (elements[i][0].caption) {
                tempArr.push(<EventsCarousel eventsArray={elements[i]} />);
            }
            else if (elements[i][0].projectLink) {
                tempArr.push(<ProjectList projectArray={elements[i]}></ProjectList>);
            }
        }
        setRenderedComponents(tempArr);
        console.log(renderedComponents.length, 'RENDERED LENGTH')
    }


    return (
        <div>
            {renderedComponents}
        </div>
    );
};

export default Home;
