import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";
import Jwt from "jsonwebtoken";


const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend and perform checks
    // handle media files using multer middleware in route file
    // get the local path of avatar and cover image perform checks and upload them on cloudinary and perform checks
    // create user in database perform checks and return the appropriate response

    const { userName, fullName, email, password } = req.body;

    if ([fullName, userName, email, password].some((field) => field?.trim() === '')) {
        throw new ApiError(400, 'Please fill all fields')
    }

    // console.log(req.body);

    // if (userName || fullName || email || password === '') {
    //     throw new ApiError(400, 'Please fill all fields')
    // }

    const userExists = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (userExists) {
        throw new ApiError(409, 'User already exists')
    }

    const avatarLocalPath = req.files?.avatar[0]?.path


    // console.log(req.files)
    // console.log(req.file)

    if (!avatarLocalPath) {
        throw new ApiError(400, 'Please upload avatar')
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(500, 'Error while uploading avatar')
    }

    // const coverImageLocalPath = req.files?.coverImage[0].path

    let coverImageLocalPath
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    let coverImage
    if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath)
        if (!coverImage) {
            throw new ApiError(500, 'Error while uploading cover image')
        }
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || '',
        userName: userName.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select('-password -refreshToken')

    if (!createdUser) {
        throw new ApiError(500, 'Error while creating user')
    }

    return res.status(201).json(new ApiResponse(200, 'User created successfully', createdUser))

})

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { refreshToken, accessToken }
    } catch (error) {
        throw new ApiError(500, 'something went wrong while generating access and refresh token')
    }
}

const loginUser = asyncHandler(async (req, res) => {
    // userName or email and password -> req.body
    // find the user 
    // if user found check password 
    // generate access and refresh token, save refresh token in database 
    // send access and refresh token to user in secure cookies 

    const { userName, email, password } = req.body

    if (!(userName || email)) {
        throw new ApiError(401, 'userName or email is required')
    }

    const user = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if (!user) {
        throw new ApiError(404, 'user does not exist')
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, 'password is not valid')
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const cookiesOptions = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie('accessToken', accessToken, cookiesOptions)
        .cookie('refreshToken', refreshToken, cookiesOptions)
        .json(
            new ApiResponse(200,
                'user logged in successfully',
                { user: loggedInUser, accessToken: accessToken, refreshToken: refreshToken }
                // { user: loggedInUser, accessToken, refreshToken }
            )
        )
})


const logoutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set:
            {
                refreshToken: undefined
            },
        },
        {
            new: true
        }
    )

    const cookiesOptions = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie('accessToken', cookiesOptions)
        .clearCookie('refreshToken', cookiesOptions)
        .json(
            new ApiResponse(200, 'user logged out', {})
        )
})


const refreshAccessToken = asyncHandler(async (req, res) => {
    const userRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!userRefreshToken) {
        throw new ApiError(401, 'Unauthorized request')
    }

    try {
        const decodedToken = Jwt.verify(userRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, 'Invalid refresh token')
        }

        if (userRefreshToken !== user.refreshToken) {
            throw new ApiError(401, 'Unauthorized request')
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

        const cookiesOptions = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie('accessToken', accessToken, cookiesOptions)
            .cookie('refreshToken', refreshToken, cookiesOptions)
            .json(new ApiResponse(200, 'access code refreshed successfully', { accessToken, refreshToken }))
    } catch (error) {
        throw new ApiError(401, error?.message || 'something went wrong while refreshing access token')
    }
})


const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id)

    const isPasswordValid = user.isPasswordCorrect(oldPassword)

    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid old password')
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, 'password changed successfully'))
})


const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, 'fetched current user details successfully', req.user))
})


const updateAccountDetails = asyncHandler(async (req, res) => {
    const { userName, fullName, email } = req.body
    const user = await User.findById(req.user?._id)

    if (!(userName || fullName || email)) {
        throw new ApiError(401, 'Please fill in the fiels you want to update')
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:
            {
                userName: userName || user.userName,
                fullName: fullName || user.fullName,
                email: email || user.email
            },
        },
        {
            new: true // updated response in return 
        }

    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, 'account details updated successfully', updatedUser))
})



const changeFullName = asyncHandler(async (req, res) => {
    const { fullName } = req.body

    if (!fullName) {
        throw new ApiError(401, 'fullName is required')
    }

    const updatedUser = User.findByIdAndUpdate(
        req.user?._id,
        {
            fullName
            // fullName:fullName
        },
        {
            new: true
        }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, 'full name updated successfully', updatedUser))
})



const changeUserName = asyncHandler(async (req, res) => {
    const { userName } = req.body

    if (!userName) {
        throw new ApiError(401, 'user name is required')
    }

    const updatedUser = User.findByIdAndUpdate(
        req.user?._id,
        {
            userName
        },
        {
            new: true
        }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, 'user name updated successfully', updatedUser))
})


const changeEmail = asyncHandler(async (req, res) => {
    const { email } = req.body

    if (!email) {
        throw new ApiError(401, 'email is required')
    }

    const updatedUser = User.findByIdAndUpdate(
        req.user?._id,
        {
            email
        },
        {
            new: true
        }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, 'email updated successfully', updatedUser))
})



const updateAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file.path

    if (!avatarLocalPath) {
        throw new ApiError(401, 'avatar file is missing')
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(401, 'something went wrong while uploading avatar on cloudinary')
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:
            {
                avatar: avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    // delete old avatar from cloudinary

    return res
        .status(200)
        .json(new ApiResponse(200, 'avatar changed successfully', updatedUser))
})


const updateCoverImg = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file.path

    if (!coverImageLocalPath) {
        throw new ApiError(401, 'cover image file is missing')
    }

    const coverImg = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImg.url) {
        throw new ApiError(401, 'something went wrong while uploading cover image file on cloudinary')
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:
            {
                coverImage: coverImg.url
            }
        },
        {
            new: true
        }
    ).select("-password")

    // delete old cover image from cloudinary

    return res
        .status(200)
        .json(new ApiResponse(200, 'cover image changed successfully', updatedUser))
})


const getChannelProfile = asyncHandler(async (req, res) => {

})


const getWatchHistory = asyncHandler(async (req, res) => {

})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    changeFullName,
    changeUserName,
    changeEmail,
    updateAvatar,
    updateCoverImg,
    getChannelProfile,
    getWatchHistory
}


// pending -> delete avatar and cover image from cloudinary after uploading successfully uploading new / updated picture on cloudinary