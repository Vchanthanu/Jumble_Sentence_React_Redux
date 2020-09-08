const questionBroadCast = (questions) => {
    return {
        type: 'QUESTIONS',
        payload: questions
    }
}
export default questionBroadCast 