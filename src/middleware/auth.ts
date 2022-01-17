


import { Request,Response,NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'

const getToken = (req:Request,res:Response,next: NextFunction) => {
    const token = req.cookies.token
    console.log(token)
    res.locals.token = token
    next()
}

export const validateToken = (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.token
    console.log(token)
    const decode = jwt.verify(token,`${config.token.login}`, (err: any,decode: any) => {
        if(err) 
        {
            return null
        }
        else 
        {
            return decode
        }
    })

    if(decode === null) 
    {
        res.status(400).json({
            message: 'Invalid'
        })
        return
    }
    
    res.locals.token = token
    res.locals.user = decode

    next()

}