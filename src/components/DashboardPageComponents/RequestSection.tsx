import { Container, Col, Row, Button } from "react-bootstrap";
import "../../css/dashboardCSS/requestSection.css";
import ProfileImage from "../ProfileImage";
import Request from "../../firebase/requests";
import {useState } from "react";
import ViewRequestModal from "./ViewRequestModal";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { getDatabase, ref, set } from "firebase/database";
import useToastContext from "../toasts/useToastContext";


export interface requestProps {
  value: {
    requestTitle: string,
    requestName: string,
    requestBody: string
    title: string,
    email: string,
    key: string,
  },
  key: string
}

// Interface for the request section component. An array of requests will be passed in
interface myRequestProps {
  requests: requestProps[];
}

// This request section component is a container for all requests that have been made
function RequestSection(myProps: myRequestProps) {

  // Sets use state variables
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeletionModal] = useState<boolean>(false);
  const [requestName, setRequestName] = useState('')
  const [requestBody, setRequestBody] = useState('')
  const [requestTitle, setRequestTitle] = useState('')
  const [projectTitle, setProjectTitle] = useState('')
  const [email, setEmail] = useState('')
  const db = getDatabase();
  const [key, setKey] = useState('')

  const addToast =useToastContext();

  // Sets use state to information passed and shows modal
  function handleShow(requestName: string, requestBody: string, requestTitle: string, email: string, projectTitle: string, k: string) {
    setRequestBody(requestBody);
    setRequestName(requestName);
    setRequestTitle(requestTitle);
    setEmail(email);
    setProjectTitle(projectTitle);
    setKey(k)
    setShowModal(true);
  }
  const handleClose = () => setShowModal(false);

  // Handles showing deletion modal for request
  function handleShowDeleteModal(k: string) {
    setShowDeletionModal(true);
    setKey(k);
  }

  // Handles deletion modal
  function handleDeletion() {
    const myRef = ref(db, 'requests/' + key);
    set(myRef, null);
    setShowDeletionModal(false);
    addToast(`Successfully deleted request.`, "success");
  }

  return (
    <div>
      <DeleteConfirmationModal show={showDeleteModal} onHide={() => setShowDeletionModal(false)} onConfirm={handleDeletion} name={'this request'} />
      <Container>
        {/* Title */}
        <div className="dashboard-request-section">
          <Row style={{ paddingBottom: "20px" }}>
            <Col className="title ms-auto">
              <h1> REQUESTS</h1>
            </Col>
          </Row>

          {/*All requests go into a scrollable div  */}
          <div
            className="request-container scroll"
            style={
              myProps.requests.length === 0
                ? { height: "auto" }
                : { height: "450px" }
            }
          >
            {/* If there are requests, map each element to a div */}
            {myProps.requests.length !== 0 ? (
              myProps.requests.map((requests, index: number) => (
                <div
                  key={index}
                  style={index !== myProps.requests.length - 1 ||  myProps.requests.length <= 3 ? { borderBottom: '1px black solid' } : {}}
                >
                  <Row className="rows ml-auto">
                    <Col md={2} sm={2} xs={4} className="profile-image">
                      <ProfileImage size="60px" position="ml-auto" />
                    </Col>
                    <Col md={7} sm={10} xs={8} className="request-name">
                      <h3 className="smallFont">{requests.value.requestTitle}</h3>
                    </Col>

                    {/* Edit and Delete Buttons */}
                    <Col md={2} sm={12} xs={12} className='margin-auto'>
                      <Row>
                        <Button className='edit-button' onClick={() => handleShow(requests.value.requestName, requests.value.requestBody, requests.value.requestTitle, requests.value.email, requests.value.title, requests.key)}>View</Button>
                      </Row>
                      <Row style={{ padding: '10px 0px 0px 0px' }}>
                        <Button className='delete-button' onClick={() => handleShowDeleteModal(requests.key)}>Delete</Button>
                      </Row>
                    </Col>
                  </Row>
                </div>
              ))
            ) : (
              // Otherwise, display empty text
              <div className="empty" style={{ color: "black" }}>
                <h4>
                  {" "}
                  <i>No Requests exist yet! </i>
                </h4>
              </div>
            )}
            <ViewRequestModal show={showModal} handleClose={handleClose} request={new Request(requestTitle, requestName, email, requestBody, projectTitle)} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default RequestSection;
