import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishVideo,
    togglePublishStatus,
    updateVideoDetails
} from '../controllers/video.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js';
import { Router } from "express";

const router = Router()
router.use(verifyJwt)

router.route('/')
    .get(getAllVideos)
    .post(
        upload.fields([
            { name: 'videoFile', maxCount: 1 },
            { name: 'thumbnail', maxCount: 1 },
        ]),
        publishVideo
    )

router.route('/:videoId')
    .patch(upload.single('thumbnail'), updateVideoDetails)
    .delete(deleteVideo)
    .patch(togglePublishStatus)
    .get(getVideoById)


export default router