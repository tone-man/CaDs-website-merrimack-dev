import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '../../css/homepageCSS/facultyCarousel.css'

import { Carousel } from 'react-bootstrap';
import ProfileImage from '../ProfileImage';



// Interface for the faculty members. Each faculty member should have a name and image
//TODO: Load image in properly 
export interface facultyMembers {
    name: string,
    image: string
    pageOrder: number,
    nestedOrder: number
}

// Interface for the faculty carousel component. An array of faculty member objects should be passed in
interface myFacultyCarouselProps {
    faculty: facultyMembers[]
}

// Faculty carousel component. Carousel that alternates through images of faculty member profile pictures + their names
function FacultyCarousel(myProps: myFacultyCarouselProps) {

    const facultyMembersNum = myProps.faculty.length;
    const facultyMembers = myProps.faculty;
    console.log(facultyMembers, 'faculty members')

    return (
        <div>
            {/* If there is more than one faculty member on a project, create a carousel; Otherwise, don't */}
            {facultyMembersNum > 1 ? (
                <Carousel variant='light' id='custom-carousel' className='custom-carousel' style={{ zIndex: 0 }}>
                    {
                        // Maps each faculty member in the array to a carousel item
                        facultyMembers.map((members, index) => (
                            <Carousel.Item key={index}>
                                {/* Each carousel item should be composed of a profile image component and the faculty members page */}
                                <ProfileImage size='70px' position='mx-auto' image={members.image}/>
                                <h1 className='featured-text' dangerouslySetInnerHTML={{ __html: members.name}}></h1>
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
            ) : (
                // Otherwise, just create one profile image/faculty name
                <>
                    <ProfileImage size='70px' position='mx-auto' image= {facultyMembers[0].image}/>
                    <h1 className='featured-text'  dangerouslySetInnerHTML={{ __html: facultyMembers[0].name}}></h1>
                </>
            )}
        </div>
    )
}

export default FacultyCarousel
