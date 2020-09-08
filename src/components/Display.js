import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Alert, Row, Container, Button, Card, Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
class Display extends React.Component {
    constructor(props) {
        super(props);
        console.log('cons DisplayProp', props)
        this.state = {
            testquestion: [],
            answer: [],
            shufful: [],
            solved: false
        }
    }
    componentDidMount() {
        if (this.props.location.state !== undefined) {
            let testquestion = this.props.questions.find(question => (question.id === this.props.location.state.questionId))
            let answer = testquestion.sentences.map(sentence => sentence.content)
            this.shuffuling(testquestion.sentences)
            this.setState({ testquestion: testquestion, answer: answer })
        }
    }
    moveAbove = (index) => {
        let list = this.state.shufful
        let tempSentence = list[index]
        list[index] = list[index - 1]
        list[index - 1] = tempSentence
        this.setState({
            shufful: list
        })
        this.validate()
    }

    shuffuling = (sample) => {
        sample.sort((a, b) => Math.random() - 0.5)
        this.setState({ shufful: sample })
    }
    moveBelow = (index) => {
        let list = this.state.shufful
        let tempSentence = list[index]
        list[index] = list[index + 1]
        list[index + 1] = tempSentence
        this.setState({
            shufful: list
        })
        this.validate()
    }
    validate = () => {
        let shuffulIndex = this.state.shufful.map(sentence => sentence.content)
        if (JSON.stringify(shuffulIndex) === JSON.stringify(this.state.answer)) {
            this.setState({ solved: true })
        } else {
            this.setState({ solved: false })
        }
    }
    submitAnswer = () => {
        let solvedUsers = this.state.testquestion.solvedBy
        solvedUsers.push(this.props.user.id)
        axios.patch('http://localhost:3000/question/' + this.state.testquestion.id, { 'solvedBy': solvedUsers })
            .then(response => { this.props.history.push('/home') }, error => console.error(error))
    }
    display = (sentence, index) => {
        return (
            <Row className='mx-auto m-3' key={index}>
                <Col xl={6} md={6} xs={6} className='text-left'>{sentence.content}</Col>
                <Col xl={6} md={6} xs={6} className='text-center'>
                    <Row>
                        <Col className='text-right'>{index !== 0 ? <button onClick={() => { this.moveAbove(index) }}><ArrowUpwardIcon/></button> : null}</Col>
                        <Col className='text-left'>{index !== this.state.shufful.length - 1 ? <button onClick={() => { this.moveBelow(index) }}><ArrowDownwardIcon/></button> : null}</Col>
                    </Row>
                </Col>
            </Row>
        )
    }

    render() {
        return (
            <Container>
                <Row className='mx-auto'>
                    <Card className='mx-auto p-3'>
                        <Col xl={12} md={12} xs={12}>
                            <br></br>
                            {(this.state.testquestion.length !== 0) ? <Row><Col className='text-center'><h4>{this.state.testquestion.name}</h4></Col></Row> :
                                <Alert variant='danger'><h3>Navigate from Home Page !!! Click Back</h3></Alert>}
                            <br></br>
                            {
                                (this.state.testquestion.length !== 0) ?
                                    <Row className='mx-auto'><Col>
                                        {this.state.shufful.map((sentence, index) => this.display(sentence, index))}</Col>
                                    </Row> : null
                            }
                            <br></br>
                            <Row><Col>{this.state.solved ? <Alert variant='success'><h3>Great Work!!! Solved</h3><h6>Please submit the answer</h6></Alert> : null}</Col></Row>
                            <Row className='mx-auto'>
                                <Col className='text-center'><Link to='/home' ><Button>Back</Button></Link></Col>
                                {(this.state.testquestion.length !== 0) ? <Col className='text-left'><Button disabled={!this.state.solved} onClick={() => this.submitAnswer()}>Submit</Button></Col> : null}
                            </Row>
                            <br></br>
                        </Col>
                    </Card>
                </Row>
            </Container>
        );
    }
}
const storeToProps = (store) => { return { user: store.user, questions: store.questions } }
export default connect(storeToProps, null)(Display);
