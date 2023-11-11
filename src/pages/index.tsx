import { Row, Col, Button, Container } from 'react-bootstrap';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import { useState, useEffect, MouseEventHandler, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import EventsCarousel from '../components/EventsCarousel';
import ProjectList from '../components/ProjectList';
import EditDraft from '../components/EditDraft';
import { facultyMembers } from '../components/FacultyCarousel';
import { myProjectProps } from '../components/ProjectCard';
import { contributerProps } from '../components/ProjectContributer';
import { myEventProps } from '../components/Events';
import { AuthContext } from '../App';


// The home page shows users the projectlist and events carousel 
const Home = () => {
    const [renderedComponents, setRenderedComponents] = useState<JSX.Element[]>([]);
    const [showDraftModal, setShowDraftModal] = useState<boolean>(false);
    const [snapShot, setSnapshot] = useState<myProjectProps | object>({});
    const db = getDatabase();

    // https://reactnavigation.org/docs/use-navigation/#:~:text=useNavigation%20is%20a%20hook%20which,of%20a%20deeply%20nested%20child.
    const navigate = useNavigate();
    const user = useContext(AuthContext);

    //Function that creates and returns a project object
    function makeProjectObject(
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
            databaseKey: databaseKey
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
        location: string,
        databaseKey: string): myEventProps {
        return {
            imgSource: imgSource,
            imageAlt: imageAlt,
            caption: caption,
            description: description,
            link: link,
            title: title,
            date: date,
            location: location,
            databaseKey: databaseKey
        };
    }

    // Gets all of the components in the homepage
    // https://firebase.google.com/docs/database/web/read-and-write
    useEffect(() => {
        const projects = ref(db, 'pages/homepage/components');

        // Stores a listener for the database in a useState variable
        onValue(projects, (snapshot) => {
            setSnapshot(snapshot.val());
        });

    }, []);


    // Actually parses database information so it can be converted into project list and event carousel components
    useEffect(() => {

        const containerArr: unknown[] = [];

        // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        // // Iterates through component objects
        for (const [key, value] of Object.entries(snapShot)) {


            // If there is not an array at a specific index in the containerArr, we need to make one in order
            // to place items in a specific order
            const type = value.type;
            if (containerArr[value.pageOrder] === undefined) {
                containerArr[value.pageOrder] = [];
            }

            // If it is type project, create a project object
            if (type.includes('project')) {
                const project = value;
                const facultyArray = [];
                const contributersArr = [];

                // Accesses the facultyMember object and converts it into an array
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
                const newObj = makeProjectObject(value.title, value.description, value.imageDescription, value.projectLink, 0, value.imageAlt, facultyArray, contributersArr, key);
                containerArr[value.pageOrder][project.nestedOrder] = newObj;

            }
            else if (type.includes('event')) {
                const event = value;

                // Creates a new project object and adds it to an array
                const newObj = makeEventObject(event.imgSource, event.imageAlt, event.caption, event.description, event.link, event.title, event.date, event.location, key);
                containerArr[value.pageOrder][event.nestedOrder] = newObj;
            }
        }
        createRenderArray(containerArr);
    }, [snapShot]);


    /**
     * Creates an array of rendered components based on the provided container array.
     * @param {Array} containerArr - The array containing components to be rendered.
     */
    function createRenderArray(containerArr) {
        // Initialize an empty array to store the rendered components
        const tempArr = [];

        // Loop through the containerArr to process each item
        for (let i = 0; i < containerArr.length; i++) {
            if (containerArr[i][0].caption) {
                // If it's an events component, push an EventsCarousel component to the tempArr
                tempArr.push(<EventsCarousel eventsArray={containerArr[i]} />);
            }
            else if (containerArr[i][0].projectLink) {
                // If it's a project component, push a ProjectList component to the tempArr
                tempArr.push(<ProjectList projectArray={containerArr[i]}></ProjectList>);
            }
        }
        // Set the state variable 'renderedComponents' with the array of rendered components
        setRenderedComponents(tempArr);
    }

    // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
    //Draft logic for either creating a new draft or showing a modal
    const handleEditButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        // Access the database and gets the user's draft information
        const drafts = ref(db, `drafts/${user.name}/homepage`);

        // Get draft information
        get(drafts)
            .then((snapshot) => {
                // If the user doesn't already have a draft for a specific page
                if (snapshot.val() === null) {
                    createNewDraft(true);
                }
                // If the user DOES have a draft for a specific page, then show a modal to ask them what they would like to do
                else {
                    setShowDraftModal(true);
                }
            })
            .catch((error) => {
                console.error('Error reading data: ', error);
            });
    };

    // Handles the creation of a new draft if the user chooses to create one,
    // otherwise, directs the user to the edit page for the existing draft
    function createNewDraft(makeNewDraft: boolean) {

        // If a new draft should be created
        if (makeNewDraft) {

            // Delete the old draft 
            const valueRef = ref(db, `drafts/${user.name}/homepage/components/`);
            set(valueRef, null);

            // Iterate through the components in the specific page you want to edit and 
            //create a draft with all that component information under a specific user's EMAIL
            for (const [key, value] of Object.entries(snapShot)) {

                // TODO: Have drafts underneath the user.UID. not their name
                const myRef = ref(db, `drafts/${user.name}/homepage/components/` + key);
                
                // Set the component information at the specified key in the database
                set(myRef, value)
                    .then(() => {
                        // Data has been successfully added to the database
                        console.log('Data added successfully!');
                    })
                    .catch((error) => {
                        // Handle errors here
                        console.error('Error adding data: ', error);
                    });
            }
        }
        // Navigate to the edit page
        navigate('/edit', { state: { pathName: `drafts/${user.name}/homepage/components` } });
    }


    return (
        <div>
            {/* If the user has already decided to edit and the user isnt null */}
            {showDraftModal && user !== null &&
                <EditDraft show={showDraftModal}
                    onHide={() => setShowDraftModal(false)}
                    onCreateDraft={(value) => createNewDraft(value)}
                    name={user.name} />
            }
            {renderedComponents}
            {/* Render edit button conditionally */}
            {user !== null &&
                <Container>
                    <Row>
                        {/* Edit button. TODO: Render conditionally based on ownership of a page */}
                        <Col md={12} style={{ textAlign: 'right' }} className='edit-button'>
                            <Button onClick={handleEditButtonClick}>Edit Page</Button>
                        </Col>
                    </Row>
                </Container>
            }
        </div>
    );
};

export default Home;
