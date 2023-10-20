import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Carousel } from 'react-bootstrap';
import ProfileImage from './ProfileImage';

export interface facultyMems {
    facultyName: string,
    facultyImg: string
}

interface myFacultyCarouselProps {
    faculty: facultyMems[]
}

function FacultyCarousel(myProps: myFacultyCarouselProps) {
    const facultyMembersNum = myProps.faculty.length;
    const facultyMembers = myProps.faculty;

    return (
        <div>
            {facultyMembersNum > 1 ? (
                <Carousel variant='link'>
                    {
                        facultyMembers.map(members =>
                            <Carousel.Item>
                                <ProfileImage size='70px'/>
                                <h1 className='profile-text'> {members.facultyName}</h1>
                            </Carousel.Item>
                        )
                    }
                </Carousel>
            ) : (
                <>
                    <ProfileImage size='70px'/>
                    <h1 className='profile-text'> {facultyMembers[0].facultyName}</h1>
                </>
            )}
        </div>
    )
}

export default FacultyCarousel
