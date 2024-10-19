import { verifyJwt } from '../middlewares/auth.middleware.js'
import {
    getAllLikedTweets,
    getAllLikedVideos,
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike
} from '../controllers/like.controller.js';
import { Router } from "express";

const router = Router()

router.use(verifyJwt)

router.route('/toggle/v/:videoId').post(toggleVideoLike)
router.route('/toggle/t/:tweetId').post(toggleTweetLike)
router.route('/toggle/c/:commentId').post(toggleCommentLike)
router.route('/liked-videos').get(getAllLikedVideos)
router.route('/liked-tweets').get(getAllLikedTweets)


export default router