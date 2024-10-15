import { ApiResponse } from "../utils/ApiResponse.js";
const healthCheck = async (req, res) => {
    // build just a basic healthCheck response that simply returns the OK status as json with message
    return res.status(200).json(new ApiResponse(200, 'Application is up and running'))
}

export {
    healthCheck
}