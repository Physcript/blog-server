

import { Document } from "mongoose";

export default interface IUSer extends Document {
    name: string,
    email: string,
    password: string,
    uid: string,
    token?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

