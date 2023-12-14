import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Image } from 'react-bootstrap';

// Interface for the profile image props
//TODO : Actually load in image correctly after we can fetch images successfully from the database
interface myImageProps {
    image?: string,
    size: string,
    position: string
}
// Creates a profile image component
function ProfileImage(myProps: myImageProps) {

    return (
        // Determines positioning and size of profile picture image
        <div className= {myProps.position} style={{ width: myProps.size, height: myProps.size }}>
            {/* Creates a rounded image */}
            <Image
                className="rounded-circle overflow-hidden"
                src= {(myProps.image) ? myProps.image: "https://drive.google.com/uc?export=view&id=1kO-8WJd676RzfngMpoINoD5OddO2ay0A"}
                alt="Profile Picture"
                style={{ width: '100%', height: '100%', objectFit: 'cover', border: '1px solid black' }}
            />
        </div>
    )
}

export default ProfileImage
