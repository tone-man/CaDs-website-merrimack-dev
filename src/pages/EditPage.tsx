import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useLocation } from 'react-router-dom';
import EditableComponent from '../components/EditableComponent';
import Header from '../components/Header';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../css/editPage.css'

// The edit page is what enables users to edit the components of a page they have owndership of
const EditPage = () => {

    // https://www.educative.io/answers/how-to-use-the-uselocation-hook-in-react
    // Reads in param that was passed in (Tells users the path to look at for the database)
    const location = useLocation();
    const { pathName } = location.state as { pathName: string };
    const [updatedComponents, setUpdatedComponents] = useState();
    const [snapshotTemp, setSnapshot] = useState({});

    // Gets the project information from the database
    useEffect(() => {
        const db = getDatabase();
        const projects = ref(db, pathName);

        // Sets usetate variable to a listener to the database
        onValue(projects, (snapshot) => {
            setSnapshot(snapshot.val());
        });
    }, []);

    useEffect(() => {
       console.log("got changed ", snapshotTemp)
    }, [snapshotTemp]);

    // Parses database information and creates editable components with respective information
    useEffect(() => {
        const arr = [];
        let temp = []

        // https://flexiple.com/javascript/loop-through-object-javascript
        // Loop through the database information and stringify the objects so they can be displayed
        if (snapshotTemp) {
            // For every value in the database
            for (const [key, value] of Object.entries(snapshotTemp)) {
                arr.push(
                    <EditableComponent
                        key={key}
                        pageOrder={value.pageOrder}
                        nestedOrder={value.nestedOrder}
                        componentKey={key}
                        data={value}
                        pathName={pathName}
                    />);
            }
            // Sort the array automatically by pageOrder and then by nestedOrder
            temp = arr.sort(function (a, b) {
                return a.props.pageOrder - b.props.pageOrder || a.props.nestedOrder - b.props.nestedOrder;
            })
            setUpdatedComponents(temp);
        }
    }, [snapshotTemp]);


    // // Goes through each of the editable components and writes them to their specific spot in the database.
    const handleSave = () => {
        console.log("save functionality here")
    };

    return (
        <div>
            <Header title={"Edit Page"} />
            <Container style={{paddingTop: '40px'}}>
                {updatedComponents}
                <Row>
                    <Col md={12} style={{ textAlign: 'right' }} className='save-button'>
                        {/* https://stackoverflow.com/questions/51977823/type-void-is-not-assignable-to-type-event-mouseeventhtmlinputelement */}
                        <Button onClick={() => handleSave()}>Save</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EditPage;
