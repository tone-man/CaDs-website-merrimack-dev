import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Image } from 'react-bootstrap';
import merrimackLogo from '../imgs/logo.webp';

interface myImageProps {
    image?: string,
    size: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProfileImage(myProps: myImageProps) {
    return (
            <div className='mx-auto' style={{ width: myProps.size, height: myProps.size }}>
            <Image
                className="rounded-circle overflow-hidden"
                src={merrimackLogo}
                alt="Profile Picture"
                style={{ width: '100%', height: '100%', objectFit: 'cover', border: '1px solid black' }}
            />
        </div>
    )
}

export default ProfileImage
