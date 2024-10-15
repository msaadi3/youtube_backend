import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";


const getVideoComments = async (req, res) => {
    const { videoId } = req.params
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(401, 'Invalid Video ID')
    }
    
    // const { page = 1, limit = 10 } = req.query
    // const comments = await Comment.aggregate([
    //     { $match: { video: videoId } },
    //     { $sort: { createdAt: -1 } },
    //     { $skip: (page - 1) * limit },
    //     { $limit: limit },
    //     { $lookup: { from: 'users', localField: 'owner', foreignField: '_id', as: 'owner' } },  
    // ])

    const comments = await Comment.find({video:videoId}).populate('owner', 'userName')

    if (comments.length == 0) {
        return res.status(200).json(new ApiResponse(200, 'No comments found', []))
    }

    return res.status(200).json(new ApiResponse(200, 'Comments fetched successfully', comments))

}


const getTweetComments = async (req, res) => {
    const { tweetId } = req.params
    
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(401, 'Invalid Tweet ID')
    }
    
    const comments = await Comment.find({tweet:tweetId}).populate('owner', 'userName')

    if (comments.length == 0) {
        return res.status(200).json(new ApiResponse(200, 'No comments found', []))
    }

    return res.status(200).json(new ApiResponse(200, 'Comments fetched successfully', comments))


}


const addCommentToVideo = async (req, res) => {
    const {videoId} = req.params
    const {content} = req.body
    const user = req.user._id
    
    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    } 
    
    if (!content) {
        throw new ApiError(401, 'Please add comment')
    }

    if(!isValidObjectId(videoId)){
        throw new ApiError(401, 'Invalid Video ID')
    }

    const newComment = new Comment({
        content,
        video: videoId,
        owner: req.user._id,
    })

    await newComment.save()

    return res.status(200).json(new ApiResponse(200, 'Comment added successfully'))


}


const addCommentToTweet = async (req, res) => {
    const {tweetId} = req.params
    const {content} = req.body
    const user = req.user._id
    
    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    } 
    
    if (!content) {
        throw new ApiError(401, 'Please add comment')
    }
    
    if(!isValidObjectId(tweetId)){
        throw new ApiError(401, 'Invalid Tweet ID')
    }

    const newComment = new Comment({
        content,
        tweet: tweetId,
        owner: user
    })

    await newComment.save()

    return res.status(200).json(new ApiResponse(200, 'Comment added successfully'))

}


const updateCommentOfVideo = async (req, res) => {
    const {videoId} = req.params
    const {content} = req.body
    const user = req.user._id
    
    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    } 
    
    if (!content) {
        throw new ApiError(401, 'Please add comment')
    }
    
    if(!isValidObjectId(videoId)){
        throw new ApiError(401, 'Invalid Video ID')
    }

    const updatedComment = await Comment.findOneAndUpdate(
        {
            video: videoId,
            owner: user // Ensuring the user can only update their own comment
        },
        {
            $set: { content } // Using $set to explicitly update the content field
        },
        { new: true } // Returns the updated comment
    );
    
    if (!updatedComment) {
        throw new ApiError(404, 'Comment not found or Unauthorized request')
    }

    return res.status(200).json(new ApiResponse(200, 'Comment updated successfully'))

}


const updateCommentOfTweet = async (req, res) => {
    const {tweetId} = req.params
    const {content} = req.body
    const user = req.user._id
    
    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    } 
    
    if (!content) {
        throw new ApiError(401, 'Please add comment')
    }
    
    if(!isValidObjectId(videoId)){
        throw new ApiError(401, 'Invalid Tweet ID')
    }

    const updatedComment = await Comment.findOneAndUpdate(
        {
            tweet: tweetId,
            owner: user // Ensuring the user can only update their own comment
        },
        {
            $set: { content } // Using $set to explicitly update the content field
        },
        { new: true } // Returns the updated comment
    );
    
    if (!updatedComment) {
        throw new ApiError(404, 'Comment not found or Unauthorized request')
    }

    return res.status(200).json(new ApiResponse(200, 'Comment updated successfully'))
}


const DeleteCommentOfVideo = async (req, res) => {
    const {videoId} = req.params
    const user = req.user._id
    
    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    } 
    
    if(!isValidObjectId(videoId)){
        throw new ApiError(401, 'Invalid Video ID')
    }

    const deletedComment = await Comment.findOneAndDelete({
        video: videoId,
        owner: user
    })

    if (!deletedComment) {
        throw new ApiError(404, 'Comment not found or Unauthorized request')
    }

    return res.status(200).json(new ApiResponse(200, 'Comment deleted successfully'))
}


const DeleteCommentOfTweet = async (req, res) => {
    const {tweetId} = req.params
    const user = req.user._id
    
    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    } 
    
    if(!isValidObjectId(tweetId)){
        throw new ApiError(401, 'Invalid Tweet ID')
    }

    const deletedComment = await Comment.findOneAndDelete({
        tweet: tweetId,
        owner: user
    })

    if (!deletedComment) {
        throw new ApiError(404, 'Comment not found or Unauthorized request')
    }

    return res.status(200).json(new ApiResponse(200, 'Comment deleted successfully'))
}


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
