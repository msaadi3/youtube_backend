import  { isValidObjectId } from "mongoose";
import { Video } from '../models/video.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";
import { v2 as cloudinary } from 'cloudinary';


// @desc    Get all videos based on query, sort, pagination
const getAllVideos = asyncHandler(async (req, res) => {
    // const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    // const videos = await Video.find({ $or: [{ title: { $regex: query, $options: 'i' } }, { description: { $regex: query, $options: 'i' } }] })

    const videos = await Video.find().populate('owner', 'userName')

    if (!videos) {
        throw new ApiError(404, 'No videos found')
    }

    return res.status(200).json(new ApiResponse(200, 'All videos fetched successfully', videos))
})


// @desc    Get video, upload on cloudinary, create video
const publishVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    const { videoFile, thumbnail } = req.files
    const user = req.user._id

    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    }

    if (!title || !description ) {
        throw new ApiError(401, 'Please add title and description')
    }

    if ( !videoFile || thumbnail) {
        throw new ApiError(401, 'Please add video and thumbnail')
    }

    const videoFileRes = await uploadOnCloudinary(videoFile.path)

    if (!videoFileRes) {
        throw new ApiError(500, 'Failed to upload video')
    }

    const thumbnailRes = await uploadOnCloudinary(thumbnail.path)

    if (!thumbnailRes) {
        throw new ApiError(500, 'Failed to upload thumbnail')
    }

    const newVideo = await Video.create({
        videoFile: videoFileRes.url,
        thumbnail: thumbnailRes.url,
        title,
        description,
        duration: videoFile.duration,
        owner: user,
        view: 0, // to be added
        isPublished: false
    })

    if (!newVideo) {
        throw new ApiError(500, 'something went wrong while creating video')
    }

    return res.status(200).json(new ApiResponse(200, 'Video created successfully', newVideo))
})



// @desc    update video details like title, description, thumbnail
const updateVideoDetails = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    const { videoId } = req.params
    const {  thumbnail } = req.files
    const user = req.user._id
    let updatefields = {}

    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(401, 'Invalid Video ID')
    }

    const doesVideoExist =  await Video.findOne({_id:videoId, owner: user})

    if (!doesVideoExist) {
        throw new ApiError(404, 'Video not found')
    }

    if (title) {
        updatefields.title = title
    }

    if (description) {
        updatefields.description = description
    }

    // if (req.files && Array.isArray(req.files.thumbnail) && req.files.thumbnail.length > 0) {
        
    // }

    if (req.files && req.files.thumbnail) {
        const thumbnailRes = await uploadOnCloudinary(thumbnail.path)
        updatefields.thumbnail = thumbnailRes.url

        // Delete the old thumbnail from Cloudinary if it exists
        if (doesVideoExist.thumbnail) {
            const publicId = doesVideoExist.thumbnail.split('/').pop().split('.')[0]; // Extract public ID from URL
            await cloudinary.uploader.destroy(publicId);
        }
    }

    if (Object.keys(updatefields).length === 0) {
        throw new ApiError(401, 'Please add fiels which you want to update')
    }

    const videoDetailsUpdated = await Video.findByIdAndUpdate({
        _id: videoId,
        owner: user
    }, {
        $set:updatefields
    }, {
        new: true
    })

    if (!videoDetailsUpdated) {
        throw new ApiError(500, 'Something went wrong while updating video details')
    }

    return res.status(200).json(new ApiResponse(200, 'Video details updated successfully', videoDetailsUpdated))

})


const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!isValidObjectId(videoId)) {
        throw new ApiError(401, 'Invalid Video ID')
    }

    const video = await Video.findOne({
        _id: videoId
    })

    if (!video) {
        throw new ApiError(404, 'Video not found')
    }

    return res.status(200).json(new ApiResponse(200, 'Video found successfully', video))
})


const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const user = req.user._id

    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(401, 'Invalid Video ID')
    }

    const video =  await Video.findOne({
        _id: videoId,
        owner: user
    })


    if (!video) {
        throw new ApiError(404, 'Video not found or Unauthorized request')
    }

    // Extract the Cloudinary public IDs for video and thumbnail
    const videoPublicId = video.videoFile.split('/').pop().split('.')[0]; // Extract public ID from video URL
    const thumbnailPublicId = video.thumbnail.split('/').pop().split('.')[0]; // Extract public ID from thumbnail URL

    // Delete the video and thumbnail from Cloudinary
    await cloudinary.uploader.destroy(videoPublicId, { resource_type: 'video' });
    await cloudinary.uploader.destroy(thumbnailPublicId, { resource_type: 'image' });
        
    const deletedVideo = await Video.findByIdAndDelete(video)

    if (!deleteVideo) {
        throw new ApiError(500, 'Something went wrong while deleting video')
    }
        
    return res.status(200).json(new ApiResponse(200, 'Video deleted successfully', deletedVideo))
})


const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const user = req.user._id

    if (!user) {
        throw new ApiError(401, 'Unauthorized request')
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(401, 'Invalid Video ID')
    }

    const video =  await Video.findOne({
        _id: videoId,
        owner: user
    })


    if (!video) {
        throw new ApiError(404, 'Video not found or Unauthorized request')
    }

    const togglingPublishStatus = await Video.findByIdAndUpdate(videoId, {$set: !isPublished}, {new :true})

    if (!togglingPublishStatus) {
        throw new ApiError(500, 'Something went wrong while toggling publish status')
    }

    return res.status(200).json(new ApiResponse(200, 'toggled publish status successfully', togglingPublishStatus))
})


export {
    getAllVideos,
    publishVideo,
    updateVideoDetails,
    getVideoById,
    deleteVideo,
    togglePublishStatus
}