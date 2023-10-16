import '../css/header.css'

import { Col } from 'react-bootstrap';

interface headerProps {
  img: string;
}

function Header(myProps: headerProps) {
  return (
    <div>
      <Col md={12} xs={12}>
                <div className='header-banner' style={{backgroundImage: `url(${myProps.img})`}}>
                    <div className="overlay">
                        <div className='line' />
                    </div>
                    <h1 className="text"> Upcoming Events!</h1>
                </div>
            </Col>
    </div>
  )
}

export default Header;
