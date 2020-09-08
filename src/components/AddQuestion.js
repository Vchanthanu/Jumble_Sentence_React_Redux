import React from 'react'
import { Container, Row, Button, Col, Alert, Card } from 'react-bootstrap'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
class AddQuestion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            sentences: [{ content: "" }, { content: "" }],
            error: false,
            submitStatus: false
        }
    }
    saveContent = (val, index) => {
        let list = this.state.sentences
        list[index].content = val
        if (val !== ' ' || val !== '') {
            this.setState({ error: false })
        }
        this.setState({ sentences: list })
    }
    addField = (index) => {
        let list = this.state.sentences
        list.splice(index + 1, 0, { content: "" })
        this.setState({ sentences: list })
    }
    removeField = (index) => {
        let list = this.state.sentences
        list.splice(index, 1)
        this.setState({ sentences: list })
    }
    validate = () => {
        if (this.state.name === '' || this.state.name === ' ') {
            return true
        }
        else {
            let testSentence = this.state.sentences.find(sentence => (sentence.content === '' || sentence.content === ' '))
            if (testSentence !== undefined) {
                return true
            } else {
                return false
            }
        }
    }
    addQuestion = () => {
        if (this.validate()) {
            this.setState({ error: true })
        } else {
            let sentencebody = this.state.sentences.map((sentence, index) => {
                return ({
                    id: index + 1,
                    content: sentence.content
                })
            })
            let reqBody = {
                name: this.state.name,
                sentences: sentencebody,
                solvedBy: [],
            }
            Axios.post('http://localhost:3000/question', reqBody)
                .then(response => {
                    this.setState({ submitStatus: true })
                    setTimeout(() => {
                        this.setState({ submitStatus: false })
                        this.props.history.push('/home');
                    }, 1500)
                })
        }
    }
    AddSentence = (sentence, index) => {
        return (
            <Row key={index} className='mx-auto mb-2'>
                <Col xl={4} md={4} xs={12} className='text-right'>
                    Sentence {index + 1} :</Col>
                <Col xl={4} md={4} xs={12} className='text-center'><input name='content' placeholder='Enter the sentence' value={sentence.content} onChange={(e) => this.saveContent(e.target.value, index)} />
                </Col>
                <Col xl={4} md={4} xs={12}>
                    <Row>
                        <Col xl={6} md={6} xs={12} className='text-left'><Button variant='success' onClick={() => this.addField(index)}><AddCircleOutlineIcon/></Button></Col>
                        <Col xl={6} md={6} xs={12} className='text-left'>{this.state.sentences.length > 2 && <Button variant='danger' onClick={() => this.removeField(index)}><RemoveCircleOutlineIcon/></Button>}</Col>
                    </Row>
                </Col>
            </Row>
        )
    }
    render() {
        return (
            <Container>
                    <Row >
                        <Col xl={12} md={12} xs={12}>
                            <Card className='mx-auto border-0' >
                                <br></br>
                                <Row ><Col><h1 className='text-center'>Add Question</h1></Col></Row>
                                <Row ><Col><Alert variant='warning p-1 m-0'><h6 className='text-center'>Add the Sentences in the correct order</h6></Alert></Col></Row>
                                <br></br>
                                <Row ><Col>{this.state.submitStatus && <Alert variant='success'><h5 className='text-center'>Successfully Submitted !!! </h5></Alert>}</Col></Row>
                                <Row ><Col>{this.state.error && <Alert variant='danger'><h5 className='text-center'>Name or Sentence should not be empty</h5></Alert>}</Col></Row>
                                <form>
                                    <Row >
                                        <Col xl={6} md={6} xs={12} className='text-right'><label htmlFor='name' ><h5>Question Title :</h5></label></Col>
                                        <Col xl={6} md={6} xs={12} className='text-left'><input type="text" id='name' placeholder='Enter the question title' name="name" onChange={(e) => this.setState({ name: e.target.value, error: false })} /></Col>
                                    </Row>
                                    <br></br>
                                    <Row ><Col>{this.state.sentences.map((sentence, index) => this.AddSentence(sentence, index))}</Col></Row>
                                    <br></br>
                                    <Row>
                                        <Col xl={6} md={6} xs={12} className='text-right'><Button variant='success' onClick={() => this.addQuestion()}>Submit</Button></Col>
                                        <Col xl={6} md={6} xs={12} className='text-center'><Link to='/home'><Button>Back</Button></Link></Col>
                                    </Row>
                                    <br></br>
                                </form>
                            </Card>
                        </Col>
                    </Row>
            </Container>)
    }
}
export default AddQuestion