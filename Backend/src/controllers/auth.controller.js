import userModel from "../models/user.model.js";

import jwt from 'jsonwebtoken'
import { sendEmail } from "../services/mail.service.js";

export async function register(req,res){

    const {username,email,password} = req.body
    

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{email},{username}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "user with this email already exists",
            success:false,
            err: "user already exists"

        })
    }

    const user = await userModel.create({username, email, password})

     const emailVerficationToken = jwt.sign({
        email: user.email
    },process.env.JWT_SECRET)
    
    await sendEmail({
        to:email,
        subject: "Welcome to Perplexity",
        html: `<p>hi ${username},</p>
        <p>Thank you for registering at <strong>Perplexity</strong>.</p>
        <p> To verify your email address, please click the link below:</p>
        <a href="http://localhost:5000/api/auth/verify-email?token=${emailVerficationToken}">Verify Email</a>
        <p> we're exited to have you on board.</p>
        <p></p>`,
    })

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
    
}

export async function login(req,res){
    const {email,password} = req.body

    const user = await userModel.findOne({email}).select('+password')

    if(!user){
        return res.status(400).json({
            message: 'Invalid email or password',
            success: false,
            err: "Incorrect password"
        })
    }

    const isPasswordMatch = await user.matchPassword(password);

    if(!isPasswordMatch){
        return res.status(400).json({
            message: 'Invalid email or password',
            success: false,
             err: "Incorrect password"
        })
    }

    if(!user.verified){
        return res.status(400).json({
            message: "Please verify your email before logging in",
            success: false,
            err: "Email not verified"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    },process.env.JWT_SECRET, {expiresIn: '7d'})

    res.cookie('token',token)

    res.status(200).json({
        message: 'Login successfully',
        success: true,
        user:{
            id:user._id,
            username: user.username,
            email: user.email
        }
    })
}

export async function getMe(req,res){
    const userId = req.user.id;
    
    const user = await userModel.findById(userId).select('-password')

    if(!user){
        return res.status(404).json({
            message: "User not found",
            success: false,
            err: "User not found"
        })
    }

    res.status(200).json({
        message: 'User details fetched successfully',
        success: true,
        user
    })

}

export async function verifyEmail(req,res){
    const {token} = req.query

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

    const user = await userModel.findOne({
        email:decoded.email
    })

    if(!user){
       return res.status(400).json({
        message: 'Invalid Token',
        success: false,
        err: "User not found"
       })
    }

    user.verified = true;

    await user.save();

    const html = `
        <h1>Email Verified Successfully</h1>
        <p>Your email has been verified successfully. You can now log in to your account</P>
        <a href="http://localhost:5000/login">Go to Login</a>
        `

        return res.send(html)
}catch(err){
        return res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err: err.message
        })
    }
}


