import { NextFunction,Response,Request } from "express";
import bcrypt from 'bcrypt'
import { CHK_EXIST_EMAIL } from './main'
import { GENERATE_TOKEN } from '../module/generate_TOKEN'


export const loginUserMid = async (req: Request, res: Response, next: NextFunction) => {
    const { email,password } = req.body
    
    const user = await CHK_EMAIL(email)
    
    if(user === false)
    {
        res.status(400).json({
            message: 'Invalid email/password'
        })
        return
    }

    if ( await CHK_PASSWORD(password,user.password) )
    {
        res.status(400).json({
            message: 'Invalid email/password'
        })
        return
    }

    // generate token
    const token = GENERATE_TOKEN(user)
    

    // object token / user already have

    res.locals.user = user
    res.locals.token = token 

    user.token = token
    await user.save()

    next()

}

const CHK_EMAIL = async (email: string) => {
    return await CHK_EXIST_EMAIL(email)
}


const CHK_PASSWORD = async (password: string, userPassword: string) => {

    const isMatch = await bcrypt.compare(password,userPassword)
    if(isMatch)
    {
        return false
    }
    return true

}

 
export default loginUserMid