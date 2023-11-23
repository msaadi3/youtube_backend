import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from "../models/User.js";
import { uploadOnCloudinary } from "../utils/cloudinary.service.js";

export const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend and perform checks
    // handle media files using multer middleware in route file
    // get the local path of avatar and cover image perform checks and upload them on cloudinary and perform checks
    // create user in database perform checks and return the appropriate response

    const { userName, fullName, email, password } = req.body;

    if ([fullName, userName, email, password].some((field) => field?.trim() === '')) {
        throw new ApiError(400, 'Please fill all fields')
    }

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

    if (!avatarLocalPath) {
        throw new ApiError(400, 'Please upload avatar')
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(500, 'Error while uploading avatar')
    }

    const coverImageLocalPath = req.files?.coverImage[0].path

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




// console.log(req.files)
// console.log(req.body)
// console.log(req.file)
// console.log(req.files?.avatar[0].path)
// console.log(req.files?.coverImage[0].path)
// console.log(req.file?.path)
// console.log(req.file?.filename)
// console.log(req.file?.mimetype)
// console.log(req.file?.size)
// console.log(req.file?.originalname)
// console.log(req.file?.fieldname)
// console.log(req.file?.encoding)
// console.log(req.file?.destination)
// console.log(req.file?.path)
// console.log(req.file?.filename)
// console.log(req.file?.mimetype)
// console.log(req.file?.size)
// console.log(req.file?.originalname)
// console.log(req.file?.fieldname)
// console.log(req.file?.encoding)