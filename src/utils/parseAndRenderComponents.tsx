import ProjectList from "../components/HomePageComponents/ProjectList";
import TextArea from "../components/FacultyPage/TextArea";
import ContactTextArea from "../components/FacultyPage/ContactTextArea";
import EventsCarousel from "../components/EventsCarousel";
import FacultyMemberHeader from "../components/FacultyPage/FacultyMemberHeader";
import FacultyPageAccordion from "../components/FacultyPage/FacultyPageAccordion";

import { myEventProps } from "../components/Events";
import { facultyMembers } from "../components/HomePageComponents/FacultyCarousel";
import { myProjectProps } from "../components/HomePageComponents/ProjectCard";
import { contributerProps } from "../components/HomePageComponents/ProjectContributer";

// Function that creates and returns a project object
export function makeProjectObject(
    type: string,
    title: string,
    description: string,
    imageDescription: string,
    projectLink: string,
    number: number,
    imageAlt: string,
    faculty: facultyMembers[],
    contributers: contributerProps[],
    databaseKey: string
): myProjectProps {
    return {
        type: type,
        title: title,
        description: description,
        imageDescription: imageDescription,
        projectLink: projectLink,
        number: number,
        imageAlt: imageAlt,
        facultyMembers: faculty,
        contributers: contributers,
        databaseKey: databaseKey,
    };
}

// Function that creates and returns an event object
export function makeEventObject(
    type: string,
    imgSource: string,
    imageAlt: string,
    caption: string,
    description: string,
    link: string,
    title: string,
    date: string,
    location: string,
    databaseKey: string
): myEventProps {
    return {
        type: type,
        imgSource: imgSource,
        imageAlt: imageAlt,
        caption: caption,
        description: description,
        link: link,
        title: title,
        date: date,
        location: location,
        databaseKey: databaseKey,
    };
}

/**
 * Reference: https://stackoverflow.com/questions/71324797/react-typescript-what-does-dispatchsetstateactionboolean-stand-for
 * Parses through snapshot data and converts each value into components that will be rendered on the page based on the specified type.
 * @param snapShot - The snapshot data to be parsed.
 * @param setRenderedComponents - The state setter for the rendered components.
 */
export function parseDataToComponents(snapShot: unknown, setRenderedComponents: React.Dispatch<React.SetStateAction<JSX.Element[]>>) {
    const containerArr: unknown[][] = [];

    if (snapShot) {

        // Iterate through the entries in the snapshot
        for (const [key, component] of Object.entries(snapShot)) {
            const facultyArray: facultyMembers[] = [];
            const contributersArr: contributerProps[] = [];

            // Check if component exists
            if (component) {
                let newObj;

                // Get component type
                const type: string = component.type;

                // To ensure components render in specified order, the order must be set in the containerArr.
                // To do this, get the page order of a component and check if the container arr at that index has an array there already.
                //If an array exists at that specific component, that means that there is another component whose page order matches.
                //Otherwise, a new array needs to be created
                if (containerArr[component.pageOrder] === undefined) {
                    containerArr[component.pageOrder] = [];
                }

                // Switch case that parses through data differently based on what type of component it is
                switch (type) {
                    // If the component is of type project
                    case 'project':
                        // Parse faculty members
                        for (const facultyKey in component.facultyMembers) {
                            const facultyMember = component.facultyMembers[facultyKey];
                            facultyArray.push({
                                facultyName: facultyMember.facultyName,
                                facultyImg: facultyMember.facultyImg,
                                nestedOrder: facultyMember.nestedOrder,
                                pageOrder: facultyMember.pageOrder
                            });
                        }
                        // Sort the array based on 'pageOrder' and 'nestedOrder'
                        facultyArray.sort(function (a, b) {
                            return (
                                a.nestedOrder - b.nestedOrder
                            );
                        });

                        // Parse contributers 
                        for (const contributerKey in component.contributers) {
                            const contributer = component.contributers[contributerKey];
                            contributersArr.push({
                                name: contributer.name,
                                description: contributer.description,
                                nestedOrder: contributer.nestedOrder
                            });
                        }

                         // Sort the array based on 'pageOrder' and 'nestedOrder'
                         contributersArr.sort(function (a, b) {
                            return (
                                a.nestedOrder - b.nestedOrder
                            );
                        });

                        // Create a project object
                        newObj = makeProjectObject(
                            'project',
                            component.title,
                            component.description,
                            component.imageDescription,
                            component.projectLink,
                            0,
                            component.imageAlt,
                            facultyArray,
                            contributersArr,
                            key
                        );
                        break;

                    // If the data is of type project, Create a project object
                    case 'event':
                        newObj = makeEventObject(
                            'event',
                            component.imgSource,
                            component.imageAlt,
                            component.caption,
                            component.description,
                            component.link,
                            component.title,
                            component.date,
                            component.location,
                            key
                        );
                        break;

                    // If the data is of type header, Create a FACULTY Page header object
                    case 'header':
                        newObj = {
                            departmentName: component.departmentName,
                            facultyName: component.facultyName,
                            facultyTitle: component.facultyTitle,
                            profileImg: 'image',
                            type: 'header',
                        };
                        break;

                    // If the data is of type text, create a FACULTY PAGE text object
                    case 'text':
                        newObj = {
                            label: component.label,
                            content: component.content,
                            type: 'text',
                        };
                        console.log('text', component.pageOrder);
                        break;

                    // If the data is of type accordion, create a FACULTY PAGE accordion object
                    case 'accordion':
                        newObj = {
                            label: component.label,
                            content: component.content,
                            type: 'accordion',
                        };
                        break;

                    // If the data is of type accordion, create a FACULTY PAGE accordion object
                    case 'contact':
                        console.log(component.location, 'LOCATION')
                        newObj = {
                            email: component.email,
                            phone: component.phone,
                            location: component.location,
                            type: 'contact'
                        };
                        break;
                    // ADD MORE CASES HERE IF NEED BE
                    default:
                        break;
                }

                // Set the newly created object to its appropraite position in the container arr which reflects the order in which
                //the components will be ordered
                if (newObj) {
                    containerArr[component.pageOrder][component.nestedOrder] = newObj;
                }
            }
        }
    }
    createRenderArray(containerArr, setRenderedComponents);
}

/**
 * Creates an array of rendered components based on the provided container array.
 * @param {any[][]} containerArr - The array containing components to be rendered.
 * @param {React.Dispatch<React.SetStateAction<JSX.Element[]>>} setRenderedComponents - The state setter for the rendered components.
 */
export function createRenderArray(containerArr: unknown[][], setRenderedComponents: React.Dispatch<React.SetStateAction<JSX.Element[]>>) {
    // Initialize a temp array to store the rendered components
    const tempArr: JSX.Element[] = [];
    let component;

    // Iterate through the data in the container Arr
    for (let i = 0; i < containerArr.length; i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const firstItem = containerArr[i][0] as Record<string, any>;
        console.log(containerArr)

        switch (firstItem?.type) {
            case 'event':
                component = containerArr[i] as myEventProps[]
                tempArr.push(<EventsCarousel eventsArray={component} />);
                break;
            case 'project':
                component = containerArr[i] as myProjectProps[]
                tempArr.push(<ProjectList projectArray={component} />);
                break;
            case 'header':
                tempArr.push(
                    <FacultyMemberHeader
                        departmentName={firstItem.departmentName}
                        facultyName={firstItem.facultyName}
                        facultyTitle={firstItem.facultyTitle}
                        profileImg="image"
                    />
                );
                break;
            case 'text':
                tempArr.push(
                    <TextArea label={firstItem.label} content={firstItem.content} />
                );
                break;
            case 'accordion':
                tempArr.push(
                    <FacultyPageAccordion label={firstItem.label} content={firstItem.content} />
                );
                break;
            case 'contact':
                tempArr.push(
                    <ContactTextArea
                        phoneNumber={firstItem.phone}
                        email={firstItem.email}
                        location={firstItem.location}
                    />
                );
                break;
            default:
                // Handle unexpected types 
                console.log(`Unexpected type encountered: ${firstItem?.type}`);
                break;
        }
    }
    // Set the rendered components to the temporary array
    setRenderedComponents(tempArr);
}
