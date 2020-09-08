const userReducer = function (state = null, action) {
    switch (action.type) {
        case 'USER':
            return action.payload
        default:
            break
    }
    return state
}
export default userReducer