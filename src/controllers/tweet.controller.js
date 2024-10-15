import  { isValidObjectId } from "mongoose";
import { Tweet } from '../models/tweet.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'


const createTweet = async (req, res) => {
const user = req.user._id
const { content } = req.body

if (!user) {
    throw new ApiError(401, 'Unauthorized request')
}

if (!content) {
    throw new ApiError(401, 'Please add content')
}

const newTweet = new Tweet({
    owner: user,
    content
})

await newTweet.save()

if (!newTweet) {
    throw new ApiError(500, 'something went wrong while creating tweet')
}

return res.status(200).json(new ApiResponse(200, 'Tweet created successfully', newTweet))
}



const getAllTweets = async (req, res) => {

 const tweets = await Tweet.find().populate('owner', 'userName').sort({createdAt: -1})
 
 if (!tweets) {
    return res.status(200).json(new ApiResponse(200, 'No tweets yet', []))
 }

 return res.status(200).json(new ApiResponse(200, 'Tweets fetched successfully', tweets))
}



const updateTweet = async (req, res) => {
    const { content } = req.body
    const {tweetId} = req.params
    const user = req.user._id
    
    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    }
    
    if (!content) {
        throw new ApiError(401, 'Please add content')
    }

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(401, 'Invalid Tweet ID')
    }

    const updatedTweet = await Tweet.findOneAndUpdate(
        {   
            _id:tweetId,
            owner: user // Ensuring the user can only update their own comment
        },
        {
            $set: { content } // Using $set to explicitly update the content field
        },
        { new: true } // Returns the updated comment
    
        // _id: req.params.tweetId,
    )

    if (!updatedTweet) {
        throw new ApiError(401, 'Tweet not found or Unauthorized request')
    }

    return res.status(200).json(new ApiResponse(200, 'Tweet updated successfully', updatedTweet))
}


const deleteTweet = async (req, res) => {
const user = req.user._id
const {tweetId} = req.params

if (!user) {
    throw new ApiError(401, 'Unauthorized request')
}

if (!isValidObjectId(tweetId)) {
    throw new ApiError(401, 'Invalid Tweet ID')
}

const deletedTweet = await Tweet.findOneAndDelete({
    _id: tweetId,
    owner: user
})

if (!deleteTweet) {
    throw new ApiError(401, 'Tweet not found or Unauthorized request')
}

return res.status(200).json(new ApiResponse(200, 'Tweet deleted successfully', deletedTweet))
}


export {
    createTweet,
    getAllTweets,
    updateTweet,
    deleteTweet
}