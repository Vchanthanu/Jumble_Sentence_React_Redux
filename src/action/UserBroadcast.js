const userBroadCast = (user) => {
    return {
        type: 'USER',
        payload: user
    }
}
export default userBroadCast