import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from '../models/like.model.js'
import { Subscription } from '../models/subscription.model.js'
import { Video } from '../models/video.model.js'

const getChannelStats = async (req, res) => {
    // get the channel stats like total video views, subscribers,total videos,total likes etc.
}


const getChannelVideos = async (req, res) => {
    // get all the videos uploaded by the channel
}


const getChannelTweets = async (req,res) => {
// get all the tweets uploaded by the channel
}


export {
    getChannelStats,
    getChannelVideos
}