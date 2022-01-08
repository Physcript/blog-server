import { Request,Response,NextFunction } from "express";
import validator from 'validator'
import User from '../models/User'
import GENERATE_UID from "../module/generate_UID";
import bcrypt from 'bcrypt'



export const createUserMid = async (req: Request, res: Response, next: NextFunction) => {
    const { name,password,confirmPassword,email } = req.body
    
    // validating empty input 
    if( VALIDATE_INPUT(name) )
    {
        res.status(400).json({
            message: 'Name required'
        })
        return
    }
    
    if( VALIDATE_INPUT(password) )
    {
        res.status(400).json({
            message: 'Password required'
        })
        return
    }

    if( VALIDATE_INPUT(confirmPassword) )
    {
        res.status(400).json({
            message: 'Confirm password required'
        })
        return
    }

    if( VALIDATE_INPUT(email) )
    {
        res.status(400).json({
            message: 'Email required'
        })
        return
    }

    // validating email
    if( VALIDATE_EMAIL(email) )
    {
        res.status(400).json({
            message: 'Invalid email'
        })
        return
    }

    if( await VALIDATE_EXISTING_EMAIL(email) )
    {
        res.status(400).json({
            message: 'Email already exist'
        })
        return
    }

    if( VALIDATE_PASSWORD_SPACE(password) )
    {
        res.status(400).json({
            message: 'Password invalid'
        })
        return
    }

    if( VALIDATE_PASSWORD_LENGTH(password) )
    {
        res.status(400).json({
            message: 'Password minimum length 5'
        })
        return
    }

    if( VALIDATE_PASSWORD_MATCH(password,confirmPassword))
    {
        res.status(400).json({
            message: 'Password not match'
        })
    }

    // generate uid
    await GENERATE_UID(name, res)
    const uid = res.locals.uid

    await FINALIZE_REGISTER(name,password,email,uid,res)

    next()

}


const VALIDATE_INPUT = ( arg1: string ) => {
    if( arg1.trim() === '') 
    {
        return true
    }
    return false
}

const VALIDATE_EMAIL = ( arg1: string ) => {
    if(!validator.isEmail(arg1)) 
    {
        return true
    }
    return false
}

const VALIDATE_EXISTING_EMAIL = async ( arg1: string ) => {
    const user = await User.findOne({ email: arg1 })
    if(user)
    {
        return true
    }
    return false
}

const VALIDATE_PASSWORD_SPACE = ( arg1: string ) => {
    if( arg1.includes(' ') )
    {
        return true
    }
    return false
}

const VALIDATE_PASSWORD_LENGTH = ( arg1: string )  => {
    if( arg1.trim().length <= 5 )
    {
        return true
    }
    return false
}

const VALIDATE_PASSWORD_MATCH = ( arg1: string, arg2: string ) => {
    if( arg1 !== arg2 ) {
        return true
    }
    return false
}


const FINALIZE_REGISTER = async ( name: string,password: string,email: string,uid: string, res: Response ) => {
    const encrypt = await bcrypt.hash(password,8)

    const user = new User({
        name,
        password: encrypt,
        email,
        uid,
    })
    
    await user.save()

    res.locals.user = user

    return
}



