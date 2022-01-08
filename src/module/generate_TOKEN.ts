import IUSer from "../interfaces/user";
import jwt from 'jsonwebtoken'
import config from '../config/config'


export const GENERATE_TOKEN = ( user: IUSer ) => {

    const plain = {
        _id: user._id,
        email: user.email,
        password: user.password,
        name: user.name,
        uid: user.uid,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }

    const token = jwt.sign(plain, `${config.token.login}`)
    return token
}