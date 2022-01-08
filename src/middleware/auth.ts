


import { Request,Response,NextFunction } from 'express'

const getToken = (req:Request,res:Response,next: NextFunction) => {
    const token = req.cookies.token
    res.locals.token = token
    next()
}

const validateToken = (token:string,res:Response,next:NextFunction) => {
    
}