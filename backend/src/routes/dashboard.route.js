import { Router } from "express";
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { getChannelStats, getChannelVideos } from '../controllers/dashboard.controller.js';

const router = Router()

router.use(verifyJwt)

router.route('/:username/stats').get(getChannelStats)

router.route('/:username/videos').get(getChannelVideos)

export default router