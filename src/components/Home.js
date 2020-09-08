import React from 'react';
import axios from 'axios'
import { Button, Badge, Alert, Container, Row, Col, CardDeck, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import questionBroadCast from '../action/QuestionBroadCast';
import { DeleteForever, Edit } from '@material-ui/icons';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }
    }
    componentDidMount() {
        this.getAllQuestions()
    }
    getAllQuestions = () => {
        axios.get('http://localhost:3000/question')
            .then((respose) => {
                this.props.questionsStore(respose.data)
                this.setState({ questions: this.props.questions })
            },
                (error) => { console.error(error) })
    }

    display = (val) => {
        this.props.history.push({ pathname: '/display', state: { questionId: val } })
    }
    editQuestion = (val) => {
        this.props.history.push({ pathname: '/edit_question', state: { questionId: val } })
    }
    deleteQuestion = (questionId) => {
        axios.delete('http://localhost:3000/question/' + questionId)
            .then(respose => { this.getAllQuestions() }, error => console.error(error))
    }
    score = () => {
        let solvedQuestions = this.state.questions.filter((question) => question.solvedBy.includes(this.props.user.id))
        return solvedQuestions.length
    }
    renderQuestion = (question) => {
        return (
            <Col xs={12} md={4} xl={3} key={question.id}>
                <Card className=' mb-4 p-2'>
                    <h5 className='text-center'>{question.name} </h5>
                    <Col className='text-center'><Badge variant='success'>Solved By : <b>{question.solvedBy.length}</b></Badge></Col>
                    <Col xs={12} md={12} xl={12}>
                        <Row>
                            <Col xs={12} md={6} xl={6} className='text-center'>{this.props.user ? this.props.user.role === 'admin' && <Button className='my-2 px-4 py-2' variant='success' onClick={() => this.editQuestion(question.id)}><Edit /></Button> : null}</Col>
                            <Col xs={12} md={6} xl={6} className='text-center'>{this.props.user ? this.props.user.role === 'admin' && <Button className='my-2 px-4 py-2' variant='danger' onClick={() => this.deleteQuestion(question.id)}><DeleteForever /></Button> : null}</Col>
                        </Row>
                    </Col>
                    <Col className='text-center'>{this.props.user ? this.props.user.role === 'user' && (question.solvedBy.includes(this.props.user.id) ? <Alert className='my-2 px-4 py-2' variant='success'><b>Solved !!! </b></Alert> : <Button className='my-2 px-4 py-2' onClick={() => this.display(question.id)}><b>Try to Solve!!!</b></Button>) : null}</Col>
                </Card>
            </Col>)
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>{this.props.user ? this.props.user.role === 'admin' && <Link to="/add_question"><Button><b>Add Question</b></Button></Link> : <Alert className='m-0 text-center' variant='warning'><b>Please Login!!! To Solve the questions</b></Alert>}</Col>
                </Row>
                <Row className='d-flex'>
                    <Col xl={3} md={5} xs={12} className='ml-auto text-center'>{this.props.user ? this.props.user.role === 'user' && <Alert className='m-0' variant='warning'><h5>My Score : <b>{this.score()}/{this.state.questions.length}</b></h5></Alert> : null}</Col>
                </Row>
                <br></br>
                <CardDeck><Col xs={12} md={12} xl={12}><Row>{this.state.questions && this.state.questions.map(question => this.renderQuestion(question))}</Row></Col></CardDeck>
            </Container>
        );
    }
}
const storeToProps = (store) => { return { user: store.user, questions: store.questions } }
const questionDispatch = (dispatch) => {
    return (bindActionCreators({ questionsStore: questionBroadCast }, dispatch))
}
export default connect(storeToProps, questionDispatch)(Home);