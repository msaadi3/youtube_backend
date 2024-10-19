import {
    getChannelSubscribers,
    getSubscribedChannels,
    toggleSubscription
} from '../controllers/subscription.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { Router } from "express";


const router = Router()

router.use(verifyJwt)

router.route('/c/:channelId')
    .post(toggleSubscription)
    .get(getChannelSubscribers)
router.route('/u/:subscriberId').get(getSubscribedChannels)


export default router