import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import userBroadCast from '../action/UserBroadcast'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
class Header extends React.Component {

    render() {
        return (
            <Navbar fixed="top" className='appColor 'expand="md">
                <Navbar.Brand>
                    {this.props.user && <Link to="/home" style={{ textDecoration: 'none' }} ><h4 className='text-dark'>JUMBLE SENTENCE</h4></Link>}
                    {this.props.user === null && <Link to="/" style={{ textDecoration: 'none' }}><h4 className='text-dark'>JUMBLE SENTENCE</h4></Link>}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        {this.props.user && <Nav.Item><Link to="/home" style={{ textDecoration: 'none' }}><b className='text-dark'>Home</b></Link></Nav.Item>}&nbsp;&nbsp;
                        {this.props.user === null && <Nav.Item><Link to="/" style={{ textDecoration: 'none' }}><b className='text-dark'>Login</b></Link></Nav.Item>}&nbsp;&nbsp;
                        {this.props.user && <Nav.Item><Link style={{ textDecoration: 'none' }} onClick={() => this.props.userLoggedIn(null)} to="/"><b className='text-dark'>Logout</b></Link></Nav.Item>}&nbsp;&nbsp;
                        {this.props.user && <Nav.Item><AccountCircleIcon/><b>{this.props.user.firstname}</b></Nav.Item>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
const storeToPropsUser = (store) => {return { user: store.user } }
const userDispatch = (dispatch) => {
    return (bindActionCreators({ userLoggedIn: userBroadCast }, dispatch))
}
export default connect(storeToPropsUser, userDispatch)(Header);