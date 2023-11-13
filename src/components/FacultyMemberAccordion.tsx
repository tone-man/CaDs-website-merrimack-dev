import { Container } from 'react-bootstrap'
import '../css/facultyMemberPage.css'
import FacultyPageAccordion, {facultyPageAccordionInterface} from './FacultyPageAccordion'


interface contentProps{
    accordion:  facultyPageAccordionInterface[];
}


function FacultyMemberAccordion(myProps: contentProps) {
    return (
        <div>
            <Container className="faculty-body-container">
        
                {/* <ContactTextArea phoneNumber='978-XXX-XXX' email='vanheckeb@merrimack.edu' building='Building' /> */}

                {
                    // Maps each contributer in the array to a project contributer item
                    myProps.accordion.map((contributer, index) => (
                        <FacultyPageAccordion key={index}
                            label={contributer.label} content={contributer.content} />
                    ))
                }
            </Container>
        </div>
    )
}

export default FacultyMemberAccordion
