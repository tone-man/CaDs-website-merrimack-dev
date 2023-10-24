import '../css/header.css'
import { Col } from 'react-bootstrap';

interface headerProps {
  img: string;
  title: string;
}

// The header component refers to the banner at the top of each section
function Header(myProps: headerProps) {
  return (
    <div>
      <Col md={12} xs={12}>
        <div className='header-banner' style={{ backgroundImage: `url(${myProps.img})` }}>
          {/* Add blue overlay */}
          <div className="overlay">
            {/*Add yellow line */}
            <div className='line' />
          </div>
          <h1 className="text"> {myProps.title}</h1>
        </div>
      </Col>
    </div>
  )
}

export default Header;
