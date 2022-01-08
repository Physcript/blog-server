

import User from '../models/User'
import { Response } from 'express'

export const CHK_EXIST_EMAIL = async (email: string) => {
    const user = await User.findOne({ email })

    if( user ) {
        return user
    }
   
    return  false
}