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

import EditableCarousel, { editableComponentProps } from '../components/EditableComponents/EditableCarousel';
import EditableFacultyHeader, { editableHeaderProps } from '../components/EditableComponents/EditableFacultyHeader';
import EditableTextArea, { editableTextProps } from '../components/EditableComponents/EditableTextArea';
import EditableContact, { editableContactProps } from '../components/EditableComponents/EditableContact';
import EditableProjectList from '../components/EditableComponents/EditableProjectList';
import { editableEventProps } from '../components/EditableComponents/EditableEventComponent';
import { DataSnapshot } from "firebase/database";

interface valueType {
    pageOrder: number
    nestedOrder: number
    data: unknown,
    componentKey: string,
    pathName: string,
    type: string
}


// Function that creates and returns a project object
export function makeProjectObject(
    type: string,
    title: string,
    description: string,
    imageDescription: string,
    projectLink: string,
    number: number,
    faculty: facultyMembers[],
    contributers: contributerProps[],
    databaseKey: string,
    image: string
): myProjectProps {
    return {
        type: type,
        title: title,
        description: description,
        imageDescription: imageDescription,
        projectLink: projectLink,
        number: number,
        facultyMembers: faculty,
        contributers: contributers,
        databaseKey: databaseKey,
        image: image
    };
}

// Function that creates and returns an event object
export function makeEventObject(
    type: string,
    image: string,
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
        image: image,
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
                                name: facultyMember.name,
                                image: facultyMember.image,
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
                                image: contributer.image,
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
                            facultyArray,
                            contributersArr,
                            key,
                            component.image
                        );
                        break;

                    // If the data is of type project, Create a project object
                    case 'event':
                        newObj = makeEventObject(
                            'event',
                            component.image,
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


/**
 * Creates an array of EDITABLE rendered components based on the snapshot of components its given.
 * @param  componentsSnapshot - The array containing components to be rendered.
 * @param  setRenderedComponents - The state setter for the rendered components.
 * @param  pathName - The path name for the components.
 * @param addToast - Function to add a toast notification.
 */
export function createEditableRenderArray(
    componentsSnapshot:  unknown,
     setRenderedComponents: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>, 
     pathName: string, 
     addToast:(message: string, type: 'success' | 'warning' | 'danger')=> void) {
    let arr: JSX.Element[] = [];

        if (componentsSnapshot) {

            const events: editableComponentProps[][] = [];
            const projects: editableComponentProps[][] = [];
            let component = undefined;

            // Iterate through every component in the snapshot
            for (const [key, value] of Object.entries(componentsSnapshot)) {
                if (key !== 'submitted') {
                    const newvalue = value as valueType;

                    // Generate specific components based on newvalue's type:
                    switch (newvalue.type) {
                        // If the component is a text or accordion component 
                        case 'text':
                        case 'accordion':
                            component = value as editableTextProps;
                            arr.push(
                                <EditableTextArea
                                    key={key}
                                    pageOrder={newvalue.pageOrder}
                                    nestedOrder={newvalue.nestedOrder}
                                    componentKey={key}
                                    data={component}
                                    pathName={pathName}
                                    type={newvalue.type}
                                    addToast={addToast}
                                />
                            );
                            break;
                        // If the component is an event
                        case 'event':
                            component = value as editableEventProps;
                            if (events[newvalue.pageOrder] === undefined) {
                                events[newvalue.pageOrder] = [];
                            }
                            if (events[newvalue.pageOrder]) {
                                events[newvalue.pageOrder].push({
                                    pageOrder: newvalue.pageOrder,
                                    nestedOrder: newvalue.nestedOrder,
                                    data: component,
                                    componentKey: key,
                                    pathName: pathName,
                                });
                            }
                            break;
                        // If the component is a project
                        case 'project':
                            if (projects[newvalue.pageOrder] === undefined) {
                                projects[newvalue.pageOrder] = [];
                            }
                            if (projects[newvalue.pageOrder]) {
                                projects[newvalue.pageOrder].push({
                                    pageOrder: newvalue.pageOrder,
                                    nestedOrder: newvalue.nestedOrder,
                                    data: value,
                                    componentKey: key,
                                    pathName: pathName,
                                });
                            }
                            break;
                        // If the component is a header (specifically for the faculty page)
                        case 'header':
                            component = value as editableHeaderProps;
                            arr.push(
                                <EditableFacultyHeader
                                    key={key}
                                    pageOrder={newvalue.pageOrder}
                                    nestedOrder={newvalue.nestedOrder}
                                    componentKey={key}
                                    data={component}
                                    pathName={pathName}
                                />
                            );
                            break;
                        // If the component is a contact component
                        case 'contact':
                            component = value as editableContactProps;
                            arr.push(
                                <EditableContact
                                    key={key}
                                    pageOrder={newvalue.pageOrder}
                                    nestedOrder={newvalue.nestedOrder}
                                    componentKey={key}
                                    data={component}
                                    pathName={pathName}
                                    type="Contact Page"
                                    addToast={addToast}
                                />
                            );
                            break;
                        default:
                            console.log(`Unexpected type encountered: ${value}`);
                            break;
                    }
                }
            }
            // Maps each of the events in the events array to a carousel item
            {
                events.map((_array, index) => (
                    <>
                        {arr.push(<EditableCarousel key={index} array={events[index]} pageOrder={events[index][0].pageOrder} type={'event'} addToast={addToast} />)}
                    </>
                ))
            }
            // Maps each of the projects in the projects array to an editable project item
            {
                projects.map((_array, index) => (
                    <>
                        {arr.push(<EditableProjectList key={index} array={projects[index]} pageOrder={projects[index][0].pageOrder} type={'project'} addToast={addToast} />)}
                    </>
                ))
            }

            // Sort the array based on 'pageOrder' and 'nestedOrder'
            arr = arr.sort(function (a, b) {
                return (
                    a.props.pageOrder - b.props.pageOrder || a.props.nestedOrder - b.props.nestedOrder
                );
            });

            // Update state variable 'updatedComponents' with the sorted array
            setRenderedComponents(arr);
        }
}
