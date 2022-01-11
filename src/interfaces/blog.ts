import { Document } from "mongoose";
import IUSer from "./user";


export default interface IBlog extends Document {
    title: string,
    author: IUSer | string,
    content: string,
    headline: string,
    picture?: string
}