import { Container, Row, Col, Button } from "react-bootstrap";
import User from "../firebase/user";
import "../css/whiteListSection.css"
import "../css/whiteListIndividual.css"
import "../css/editProfile.css"
import EditUserModal from "./EditUserModal";
import ProfileImage from "./ProfileImage";

interface ProfileProps {
    user: User | null;
    onEdit: (user: User) => void | undefined;
}

export default function EditProfile(props: ProfileProps) {
    const user = props.user;
    const onEdit = props.onEdit;

    return (
        <div>
            <Container>
                <div className='dashboard-whitelist-section'>
                    <Container>
                        <div className='dashboard-whitelist-title'>
                            <Row style={{ paddingBottom: '10px' }}>
                                <Col className='title' >
                                    <h1> PROFILE</h1>
                                </Col >
                            </Row>
                        </div>
                    </Container >
                    {(user) &&
                        <Container fluid className='individual-whitelist container-white-bordered'>
                            <Row style={{ margin: 'auto' }} className=' ms-auto'>

                                {/* Profile Image */}
                                <Col md={2} sm={2} xs={4} className='margin-auto' >

                                    {/* Pass in user's image if there exists one */}
                                    {user.photoURL !== 'img' ?
                                        (<ProfileImage size='60px' position='mx-auto' image={user.photoURL} />)
                                        :
                                        (<ProfileImage size='60px' position='mx-auto' />)}
                                </Col>

                                {/* User Name */}
                                <Col md={8} sm={12} xs={12} className='name'>
                                    <h3 className='smallFont'>{user.name}</h3>
                                </Col>

                                {/* Edit and Delete Buttons */}
                                <Col md={2} sm={12} xs={12} className='margin-auto'>
                                    <EditUserModal updateUser={onEdit} user={user} />
                                </Col>

                            </Row>
                        </Container>
                    }
                </div>
            </Container>
        </div>
    )
}