import  { isValidObjectId } from "mongoose";
import { Like } from '../models/like.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const toggleVideoLike = async (req, res) => {
    const { videoId } = req.params
    const userId = req.user._id

    if (!isValidObjectId(videoId)) {
        throw new ApiError(401, 'Invalid Video ID')
    }

    const like = await Like.findOne({
        video: videoId,
        likedBy: userId
    })

    if (like) {
        await like.remove()
        return res.status(200).json(new ApiResponse(200, 'Video unliked successfully'))
    } else {
        const newLike = new Like({
            video: videoId,
            likedBy: userId
        })
        await newLike.save()
        return res.status(200).json(new ApiResponse(200, 'Video liked successfully'))
    }

}


const toggleTweetLike = async (req, res) => {
    const { tweetId } = req.params
    const userId = req.user._id

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(401, 'Invalid Tweet ID')
    }

    const like = await Like.findOne({
        tweet: tweetId,
        likedBy: userId
    })

    if (like) {
        await like.remove()
        return res.status(200).json(new ApiResponse(200, 'Tweet unliked successfully'))
    } else {
        const newLike = new Like({
            tweet: tweetId,
            likedBy: userId
        })
        await newLike.save()
        return res.status(200).json(new ApiResponse(200, 'Tweet liked successfully'))
    }
}


const toggleCommentLike = async (req, res) => {
    const { commentId } = req.params
    const userId = req.user._id

    if (!isValidObjectId(commentId)) {
        throw new ApiError(401, 'Invalid Comment ID')
    }

    const like = await Like.findOne({
        comment: commentId,
        likedBy: userId
    })

    if (like) {
        await like.remove()
        return res.status(200).json(new ApiResponse(200, 'Comment unliked successfully'))
    } else {
        const newLike = new Like({
            comment: commentId,
            likedBy: userId
        })
        await newLike.save()
        return res.status(200).json(new ApiResponse(200, 'Comment liked successfully'))
    }
}


const getAllLikedVideos = async (req, res) => {
    const userId = req.user._id
    const likedVideos = await Like.find({ likedBy: userId }).populate('video')

    if (likedVideos) {
        return res.status(200).json(new ApiResponse(200, 'liked videos fetched successfully', likedVideos))
    } else {
        return res.status(400).json(new ApiError(400, 'You have no liked videos'))
    }
}


const getAllLikedTweets = async (req, res) => {
    const userId = req.user._id
    const likedTweets = await Like.find({ likedBy: userId }).populate('tweet')

    if (likedTweets) {
        return res.status(200).json(new ApiResponse(200, 'liked tweets fetched successfully', likedTweets))
    } else {
        return res.status(400).json(new ApiError(400, 'You have no liked tweets'))
    }
}


export {
    toggleVideoLike,
    toggleTweetLike,
    toggleCommentLike,
    getAllLikedVideos,
    getAllLikedTweets
}