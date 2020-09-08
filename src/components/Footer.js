import React from 'react';
import { Navbar } from 'react-bootstrap'
class Footer extends React.Component {
    render() {
        return (
            <Navbar className='footer mx-auto appColor ' fixed="bottom" >
                <footer>
                    <b>Copyright@2020</b>
                </footer>
            </Navbar>
        );
    }
}
export default Footer;