import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmpassword: '',
            invalidfirstname: true,
            invalidlastname: true,
            invalidemail: true,
            invalidpassword: true,
            invalidconfirmpassword: true,
            invalidsubmit: true,
            onchangefirstname: false,
            onchangelastname: false,
            onchangeemail: false,
            onchangepassword: false,
            onchangeconfirmpassword: false,
        }
    }
    signUp = (event) => {
        let signupRequestBody = {
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "email": this.state.email,
            "password": this.state.password,
            "role": 'user',
        }
        axios.post('http://localhost:3000/users', signupRequestBody)
            .then(response => {
                console.log('signUp done')
                this.props.history.push('/')
            }, error => {
                console.error(error)
            })
    }
    getFirstName = (event) => {
        this.setState({ onchangefirstname: true })
        if (event.target.value === '' || event.target.value.includes('@') || event.target.value.includes('#') || event.target.value.includes('$') || event.target.value.includes('%') || event.target.value.includes('*')) {
            this.setState({ invalidfirstname: true })
        } else {
            this.setState({ invalidfirstname: false, firstname: event.target.value })
        }
        this.vaildsubmit();
    }
    getLastName = (event) => {
        this.setState({ onchangelastname: true })
        if (event.target.value === '' || event.target.value.includes('@') || event.target.value.includes('#') || event.target.value.includes('$') || event.target.value.includes('%') || event.target.value.includes('*')) {
            this.setState({ invalidlastname: true })
        } else {
            this.setState({ invalidlastname: false, lastname: event.target.value })
        }
        this.vaildsubmit();
    }
    getEmail = (event) => {
        this.setState({ onchangeemail: true })
        if (event.target.value.includes('@')) {
            this.setState({ invalidemail: false, email: event.target.value })
        } else {
            this.setState({ invalidemail: true })
        }
        this.vaildsubmit();
    }
    getPassword = (event) => {
        this.setState({ onchangepassword: true })
        if (event.target.value === '') {
            this.setState({ invalidpassword: true })
        } else {
            this.setState({ invalidpassword: false, password: event.target.value })
        }
        this.vaildsubmit();
    }
    getConfirmPassword = (event) => {
        this.setState({ onchangeconfirmpassword: true })
        if (event.target.value !== this.state.password) {
            this.setState({ invalidconfirmpassword: true })
        } else {
            this.setState({ invalidconfirmpassword: false, confirmpassword: event.target.value })
        }
        this.vaildsubmit();
    }
    vaildsubmit = () => {
        setTimeout(() => {
            if (this.state.invalidfirstname || this.state.invalidlastname || this.state.invalidemail || this.state.invalidpassword || this.state.invalidconfirmpassword) {
                this.setState({ invalidsubmit: true })
            } else {
                this.setState({ invalidsubmit: false })
            }
        }, 300)
    }
    render() {
        return (
            <Container >
                <Row  className='mx-auto'>
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
                            <Row className='mx-auto'><Col><h2 className='text-center'>SignUp Here</h2></Col></Row>
                            <br></br>
                            <form className='m-3'>
                                <Row className='mx-auto'>
                                    <Col xl={6} md={6} xs={12}><label htmlFor='firstname'>{this.state.invalidfirstname && <span className='text-danger'>*</span>}First Name :</label></Col>
                                    <Col xl={6} md={6} xs={12}><input type="text" id='firstname' name="firstname" onChange={this.getFirstName}></input></Col>
                                </Row>
                                <Row className='mx-auto'><Col className="text-center ">{this.state.invalidfirstname && this.state.onchangefirstname && <span className='text-danger'>Invalid firstName</span>}</Col></Row>
                                <Row className='mx-auto'>
                                    <Col xl={6} md={6} xs={12}><label htmlFor='lastname'>{this.state.invalidlastname && <span className='text-danger'>*</span>}Last Name :</label></Col>
                                    <Col xl={6} md={6} xs={12}><input type="text" id='lastname' name="lastname" onChange={this.getLastName}></input></Col>
                                </Row>
                                <Row className='mx-auto'><Col className="text-center ">{this.state.invalidlastname && this.state.onchangelastname && <span className='text-danger'>Invalid LastName</span>}</Col></Row>
                                <Row className='mx-auto'>
                                    <Col xl={6} md={6} xs={12}><label htmlFor="email">{this.state.invalidemail && <span className='text-danger'>*</span>}E-mail :</label></Col>
                                    <Col xl={6} md={6} xs={12}><input type="email" id='email' onChange={this.getEmail}></input></Col>
                                </Row>
                                <Row className='mx-auto'><Col className="text-center ">{this.state.invalidemail && this.state.onchangeemail && <span className='text-danger'>Email Id, must contain '@'</span>}</Col></Row>
                                <Row className='mx-auto'>
                                    <Col xl={6} md={6} xs={12}><label htmlFor='password'>{this.state.invalidpassword && <span className='text-danger'>*</span>}Password :</label></Col>
                                    <Col xl={6} md={6} xs={12}><input type="password" id="password" onChange={this.getPassword}></input></Col>
                                </Row>
                                <Row className='mx-auto'><Col className="text-center ">{this.state.invalidpassword && this.state.onchangepassword && <span className='text-danger'>Password is required</span>}</Col></Row>
                                <Row className='mx-auto'>
                                    <Col xl={6} md={6} xs={12}><label htmlFor="confirmpassword">{this.state.invalidconfirmpassword && <span className='text-danger'>*</span>}Confirmpassword :</label></Col>
                                    <Col xl={6} md={6} xs={12}><input type="password" id='confirmpassword' onChange={this.getConfirmPassword}></input></Col>
                                </Row>
                                <Row className='mx-auto'><Col className="text-center ">{this.state.invalidconfirmpassword && this.state.onchangeconfirmpassword && <span className='text-danger'>Confirm Password should match with Password</span>}</Col></Row>
                                <br></br>
                                <Row className='mx-auto'>
                                    <Col className="text-center"><input type="button" onClick={this.signUp} disabled={this.state.invalidsubmit} value="SignUp"></input></Col>
                                </Row>
                                <br></br>
                            </form>
                        </Col>
                    </Card>
                </Row>
            </Container>
        )
    }
}
export default SignUp