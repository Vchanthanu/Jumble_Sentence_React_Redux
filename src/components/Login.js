import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Container, Card, Row, Col, Button, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import userBroadCast from '../action/UserBroadcast'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            username: '',
            email: '',
            password: '',
            wrongPassword: false,
            wrongEmail: false,
            invalidEmail: true,
            invalidPassword: true,
            emailOnChange: false,
            passwordOnChange: false
        }
    }
    login = () => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                this.setState({ users: response.data })
                var loguser = this.state.users.find(user => user.email === this.state.email)
                if (loguser === undefined) {
                    this.setState({ wrongEmail: true })
                } else {
                    if (loguser.password === this.state.password) {
                        this.props.userLoggedIn(loguser)
                        console.log('Login Successful')
                        this.props.history.push('/home')
                    } else {
                        this.setState({ wrongPassword: true })
                    }
                }
            }, error => { console.error(error); })

    }
    getEmail = (event) => {
        this.setState({ wrongEmail: false, emailOnChange: true })
        if (event.target.value.includes('@')) {
            this.setState({ invalidEmail: false })
            this.setState({ email: event.target.value })
        } else {
            this.setState({ invalidEmail: true })
        }
    }
    getPassword = (event) => {
        this.setState({ wrongPassword: false, passwordOnChange: true })
        if (event.target.value === '') {
            this.setState({ invalidPassword: true })
        } else {
            this.setState({ invalidPassword: false })
            this.setState({ password: event.target.value })
        }
    }
    render() {
        return (
            <Container >
                <Row className='mx-auto'>
                    <Card className='mx-auto'>
                        <Col xl={12} md={12} xs={12}>
                            <br></br>
                            <Row className='mx-auto'>
                                <Col xl={5} md={5} xs={12}>
                                    <Link to='/'><Button >
                                        <h4>LOGIN</h4>
                                    </Button></Link>
                                </Col>
                                <Col xl={2} md={2} xs={12}>&nbsp;</Col>
                                <Col xl={5} md={5} xs={12} >
                                    <Link to='/signup'><Button >
                                        <h4>SIGNUP</h4>
                                    </Button></Link>
                                </Col>
                            </Row>
                            <br></br>
                            <Row className='mx-auto'><Col><h2 className='text-center'>Login Here</h2></Col></Row>
                            <br></br>
                            <Row > <Col xl={12} md={12} xs={12}>{this.state.wrongEmail && <Alert variant='danger'><h6 className="text-center">Invalid Email Id</h6></Alert>}
                                {this.state.wrongPassword && <Alert variant='danger'><h6 className="text-center">Invalid Password</h6></Alert>}</Col></Row>
                            <form className='m-3'>
                                <Row className='mx-auto'>
                                    <Col xl={5} md={5} xs={12} ><label htmlFor='email'>{this.state.invalidEmail && <span className='text-danger'>*</span>}E-mail :</label></Col>
                                    <Col xl={5} md={5} xs={12} ><input type="email" id='email' onChange={this.getEmail} name='email'></input></Col>
                                </Row>
                                <Row className='mx-auto'><Col className="text-center ">{this.state.invalidEmail && this.state.emailOnChange && <span className='text-danger'>Email Id, must contain '@'</span>}</Col></Row>
                                <Row className='mx-auto'>
                                    <Col xl={5} md={5} xs={12} ><label htmlFor='password' >{this.state.invalidPassword && <span className='text-danger'>*</span>}Password :</label></Col>
                                    <Col xl={5} md={5} xs={12} ><input type="password" id='password' onChange={this.getPassword} name='password'></input></Col>
                                </Row>
                                <Row className='mx-auto'><Col className="text-center">{this.state.invalidPassword && this.state.passwordOnChange && <span className='text-danger'>Password is required</span>}</Col></Row>
                                <br></br>
                                <Row className='mx-auto'><Col className="text-center"><input type="button" onClick={this.login} disabled={this.state.invalidEmail || this.state.invalidPassword} value="Login"></input></Col></Row>
                                <br></br>
                            </form>
                        </Col>
                    </Card>
                </Row>
            </Container>
        )
    }
}
const userDispatch = (dispatch) => {
    return (bindActionCreators({ userLoggedIn: userBroadCast }, dispatch))
}
export default connect(null, userDispatch)(Login)