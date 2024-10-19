import {
    DeleteCommentOfTweet,
    DeleteCommentOfVideo,
    addCommentToTweet,
    addCommentToVideo,
    getTweetComments,
    getVideoComments,
    updateCommentOfTweet,
    updateCommentOfVideo
} from "../controllers/comment.controller.js";
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { Router } from "express";


const router = Router()

router.use(verifyJwt) // apply verifyJwt middleware to all routes at once 

// routes
router.route('/:videoId')
    .get(getVideoComments)
    .post(addCommentToVideo)


router.route('/:tweetId')
    .get(getTweetComments)
    .post(addCommentToTweet)


router.route('/:commentId')
    .patch(updateCommentOfVideo)
    .patch(updateCommentOfTweet)
    .delete(DeleteCommentOfVideo)
    .delete(DeleteCommentOfTweet)


export default router