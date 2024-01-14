import { verifyJwt } from '../middlewares/auth.middleware.js'
import { Router } from "express";
import {
    addVideoToPlaylist,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    removeVideoFromPlaylist,
    updatePlaylist
} from '../controllers/playlist.controller.js';

const router = Router()

router.use(verifyJwt)

router.route('/').post(createPlaylist)
router.route('/:userId/playlists').get(getUserPlaylists)

router.route('/:playlistId')
    .get(getPlaylistById)
    .delete(deletePlaylist)
    .patch(updatePlaylist)

router.route('/add/:playlistId/:videoId').patch(addVideoToPlaylist)
router.route('/delete/:playlistId/:videoId').patch(removeVideoFromPlaylist)


export default router