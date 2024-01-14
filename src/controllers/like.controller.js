import mongoose, { isValidObjectId } from "mongoose";
import { Like } from '../models/like.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})


const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
})


const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params
})


const getAllLikedVideos = asyncHandler(async (req, res) => {
    //   get all liked videos
})


// added by me not sir 
const getAllLikedTweets = asyncHandler(async (req, res) => {
    // get all liked tweets
})


export {
    toggleVideoLike,
    toggleTweetLike,
    toggleCommentLike,
    getAllLikedVideos,
    getAllLikedTweets
}