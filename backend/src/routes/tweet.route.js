import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet
} from '../controllers/tweet.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { Router } from "express";


const router = Router()

router.use(verifyJwt)

router.route('/').post(createTweet)
router.route('/:userId/tweets').get(getUserTweets)
router.route('/:tweetId').patch(updateTweet).delete(deleteTweet)



export default router