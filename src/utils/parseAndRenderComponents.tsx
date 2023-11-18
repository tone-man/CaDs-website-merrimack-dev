
import ContactTextArea from "../components/ContactTextArea";
import { myEventProps } from "../components/Events";
import EventsCarousel from "../components/EventsCarousel";
import { facultyMembers } from "../components/FacultyCarousel";
import FacultyMemberHeader from "../components/FacultyMemberHeader";
import FacultyPageAccordion from "../components/FacultyPageAccordion";
import { myProjectProps } from "../components/ProjectCard";
import { contributerProps } from "../components/ProjectContributer";
import ProjectList from "../components/ProjectList";
import TextArea from "../components/TextArea";

// Function that creates and returns a project object
export function makeProjectObject(
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
 * Parses through snapshot data and converts them into components based on the specified type that will be rendered on page.
 * @param snapShot - The snapshot data to be parsed.
 * @param setRenderedComponents - The state setter for the rendered components.
 */
export function parseDataToComponents(snapShot: unknown, setRenderedComponents: React.Dispatch<React.SetStateAction<JSX.Element[]>>) {
    const containerArr: unknown[][] = [];

    // Check if snapshot data is present
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
                console.log(type, 'TYPE HERE')

                // To give a specified order in the containerArr, get the components page and order and check if an array exists there.
                //If an array exists at that specific component, that means that there is another component whose page order matches.
                //Otherwise, a new array needs to be created
                if (containerArr[component.pageOrder] === undefined) {
                    containerArr[component.pageOrder] = [];
                }

                // Switch case that parses through data differenFtly based on what type of data it is
                switch (type) {
                    // If the data is of type project
                    case 'project':
                        // Parse faculty members
                        for (const facultyKey in component.facultyMembers) {
                            const facultyMember = component.facultyMembers[facultyKey];
                            facultyArray.push({
                                facultyName: facultyMember.facultyName,
                                facultyImg: facultyMember.facultyImg,
                            });
                        }

                        // Parse contributers 
                        for (const contributerKey in component.contributers) {
                            const contributer = component.contributers[contributerKey];
                            contributersArr.push({
                                name: contributer.name,
                                description: contributer.description,
                            });
                        }

                        // Create a project object
                        newObj = makeProjectObject(
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

    // Iterate through the data in the container Arr
    for (let i = 0; i < containerArr.length; i++) {
        console.log(containerArr)
       
        if (containerArr[i][0]?.caption) {
             // If the element is an event
            tempArr.push(<EventsCarousel eventsArray={containerArr[i]} />);
           
        } else if (containerArr[i][0]?.projectLink) {
             // If the element is a project
            tempArr.push(<ProjectList projectArray={containerArr[i]} />);
        }
        
        else if (containerArr[i][0].type === 'header') {
            // If the element is a faculty page header, create a header component
            tempArr.push(
                <FacultyMemberHeader
                    departmentName={containerArr[i][0].departmentName}
                    facultyName="'faculty name"
                    facultyTitle="facultty title"
                    profileImg="image" />
            );
        }
       
        else if (containerArr[i][0].type === 'text') {
             // If the element is a text area, create a faculty page text area component
            tempArr.push(
                <TextArea label={containerArr[i][0].label} content={containerArr[i][0].content} />
            );
        }
        
        else if (containerArr[i][0].type === 'accordion') {
            console.log("LABEL", containerArr[i][0].label)
            // If the element is an accordion, create an accordion component
            tempArr.push(
                <FacultyPageAccordion label={containerArr[i][0].label} content={containerArr[i][0].content} />
            );
        } 
        else if (containerArr[i][0].type === 'contact') {
            console.log("CONTACT", containerArr[i])
            // If the element is an accordion, create an accordion component
            tempArr.push(
                <ContactTextArea
                    phoneNumber={containerArr[i][0].phoneNumber}
                    email={containerArr[i][0].email}
                    location={containerArr[i][0].location} />
            );
        }
    }

    // Set the rendered components to the temporary array
    setRenderedComponents(tempArr);
}
