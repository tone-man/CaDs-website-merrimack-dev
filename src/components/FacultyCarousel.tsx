import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Carousel } from 'react-bootstrap';
import ProfileImage from './ProfileImage';


// Interface for the faculty members. Each facultty member should have a name and image
//TODO: Load image in properly 
export interface facultyMembers {
    facultyName: string,
    facultyImg: string
}

// Interface for the faculty carousel component. An array of faculty member objects should be passed in
interface myFacultyCarouselProps {
    faculty: facultyMembers[]
}

// Faculty carousel component. Carousel that alternates through images of faculty member profile pictures + their names
function FacultyCarousel(myProps: myFacultyCarouselProps) {

    const facultyMembersNum = myProps.faculty.length;
    const facultyMembers = myProps.faculty;

    return (
        <div>
            {/* If there is more than one faculty member on a project, create a carousel; Otherwise, don't */}
            {facultyMembersNum > 1 ? (
                <Carousel variant='link'>
                    {
                        // For each faculty member in the array, map each element to a carousel item
                        facultyMembers.map(members =>
                            <Carousel.Item>
                                {/* Each carousel item should be composed of a profile image component and the faculty members page */}
                                <ProfileImage size='70px'/>
                                <h1 className='featured-text'> {members.facultyName}</h1>
                            </Carousel.Item>
                        )
                    }
                </Carousel>
            ) : (
                // Otherwise, just create one profile image/faculty name
                <>
                    <ProfileImage size='70px'/>
                    <h1 className='featured-text'> {facultyMembers[0].facultyName}</h1>
                </>
            )}
        </div>
    )
}

export default FacultyCarousel
