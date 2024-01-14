import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.model.js";


// comment controllers related to tweets are added by me not from sir and also in comment model

const getVideoComments = asyncHandler(async (req, res) => {
    // get all comments for a video
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query
})


const getTweetComments = asyncHandler(async (req, res) => {
    // get all comments for a tweet

})


const addCommentToVideo = asyncHandler(async (req, res) => {
    // add a comment to a video
})


const addCommentToTweet = asyncHandler(async (req, res) => {
    // add a comment to a tweet
})


const updateCommentOfVideo = asyncHandler(async (req, res) => {
    // update comment of a video
})


const updateCommentOfTweet = asyncHandler(async (req, res) => {
    // update comment of a tweet
})


const DeleteCommentOfVideo = asyncHandler(async (req, res) => {
    // delete comment of a video
})


const DeleteCommentOfTweet = asyncHandler(async (req, res) => {
    // delete comment of a tweet
})


export {
    getVideoComments,
    getTweetComments,
    addCommentToVideo,
    addCommentToTweet,
    updateCommentOfVideo,
    updateCommentOfTweet,
    DeleteCommentOfVideo,
    DeleteCommentOfTweet
}
