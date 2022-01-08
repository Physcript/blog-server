
import User from '../models/User'
import { Response } from 'express'


const GENERATE_UID =  async ( name: string , res: Response) => {
    let con = true

    do {
        const num = GENERATE_NUMBER()
        let uid = `${name}.${num}`
        const user = await User.findOne({ uid: uid })
                
        if( user === null || user === '' ) {
            con = false
            res.locals.uid = uid
        }

    } while ( con )

}
    
const GENERATE_NUMBER = () => {
    const num = ((Math.random() * 10000) + 1)
    const data =  Math.trunc(num);
    return data
}


export default GENERATE_UID
