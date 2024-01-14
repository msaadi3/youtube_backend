import { Router } from "express";
import {
    changeCurrentPassword,
    changeEmail,
    changeFullName,
    changeUserName,
    getChannelProfile,
    getCurrentUser,
    getWatchHistory,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateAccountDetails,
    updateAvatar,
    updateCoverImg
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1
        },
        {
            name: 'coverImage',
            maxCount: 1
        }
    ]),
    registerUser
)

router.route('/login').post(loginUser)

// secured routes
router.route('/logout').post(verifyJwt, logoutUser)

router.route('/refresh-accessToken').post(refreshAccessToken)

router.route('/update-password').post(verifyJwt, changeCurrentPassword)

router.route('/get-user').get(verifyJwt, getCurrentUser)

router.route('/update-account-info').patch(verifyJwt, updateAccountDetails)

router.route('/update-name').patch(verifyJwt, changeFullName)

router.route('/update-username').patch(verifyJwt, changeUserName)

router.route('/update-email').patch(verifyJwt, changeEmail)

router.route('/update-avatar').patch(verifyJwt, upload.single('avatar'), updateAvatar)

router.route('/update-coverimage').patch(verifyJwt, upload.single('coverImage'), updateCoverImg)

router.route('/channel/:username').get(verifyJwt, getChannelProfile)

router.route('/watch-history').get(verifyJwt, getWatchHistory)




export default router