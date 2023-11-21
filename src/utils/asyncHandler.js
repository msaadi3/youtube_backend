// asyncHandler(A wrapper function) with Promises approach
export const asyncHandler = (requestHandler) => {
    return (err, req, res, next) => {
        Promise.resolve(requestHandler(err, req, res, next)).catch((error) => next(error))
    }
}



// asyncHandler(A wrapper function) with try catch approach

// const asyncHandler = (func) => { async () => { } }
// const asyncHandler = (func) =>  async () => { } 
// export const asyncHandler = (requestHandler) => async (err, req, res, next) => {
//     try {
//         await requestHandler(err, req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }