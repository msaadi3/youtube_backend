import mongoose, { isValidObjectId } from "mongoose";
import { Subscription } from '../models/subscription.model.js'
import { User } from "../models/user.model.js";
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from "../utils/asyncHandler.js";


const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params
})



const getChannelSubscribers = asyncHandler(async (req, res) => {
    //    returns the subscribers list of the channel
    const { channelId } = req.params
})



const getSubscribedChannels = asyncHandler(async (req, res) => {
    // returns the list of channels that user has subscribed to
    const { subscriberId } = req.params
})


export {
    toggleSubscription,
    getChannelSubscribers,
    getSubscribedChannels
}