
import { Request,Response,NextFunction } from 'express'


export const createUserCon = (req: Request,res:Response) => {

    res.status(200).json({
        message: res.locals.user
    })
    
    res.locals.user = undefined
    res.locals.uid = undefined
    return
}

export const loginUSerCon = (req: Request, res: Response) => {

    res.status(200).json({
        message: {
            user: res.locals.user,
            token: res.locals.token
        }
    })
    
    res.locals.user = undefined
    res.locals.token = undefined
    return
}