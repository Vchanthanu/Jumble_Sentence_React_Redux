const questionReducer = (state = null, action) => {
    switch (action.type) {
        case 'QUESTIONS':
            return action.payload
        default:
            break
    }
    return state
}
export default questionReducer