


export default responseSend = (res, success = false, status = 200, message = '', data = {})=> {
    return (
        res.status(status).json({
            success,
            message,
            data
        })
    )
}