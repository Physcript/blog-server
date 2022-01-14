

import mongoose from 'mongoose'
import User from '../models/User'
import { Request,Response } from 'express'
import Blog from '../models/Blog'
import IBlog from '../interfaces/blog'


const createBlog = async (req: Request, res: Response) => {

    console.log('starting')

    const { author,title,content,headline,picture } = req.body

    const user = await res.locals.user 
    
    console.log(user)                                                                   

    const blog = new Blog({

        author: user,
        title,
        content,
        headline,
        picture
        
    })
    
    return blog.save()
        .then( (newBlog: IBlog) => {
            console.log(newBlog)
            return res.status(200).json({
                message: newBlog
            })
        })
        .catch((err: any) => {
            console.log(err)
            return  res.status(500).json({
                err
            })
        })
}


const readBlog = (req:Request, res:Response) => {
    
    const _id = req.params.blogID
    

    return Blog.findById(_id)
        .then( (blog) => {
            if(blog)
            {
                return res.status(200).json({
                    message: blog
                })
            }
            else 
            {
                return res.status(404).json({
                    message: 'Not Found'
                })
            }
        })
        .catch( (error) => {
            return res.status(500).json({
                message: error
            })
        })

}

const editBlog = (req:Request, res: Response) => {
    const _id = req.params.blogID
    
    return Blog.findById(_id)
        .then((blog) => {
            if(blog)
            {
                blog.set(req.body)
                blog.save()
                    .then((newBlog:any) => {
                        return res.status(200).json({
                            message: newBlog
                        })
                    })
                    .catch((error:any) => {
                        return res.status(500).json({
                            error
                        })
                    })

            }
            else
            {
                return res.status(404).json({
                    message: 'Not Found'
                })
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: 'Not Found'
            })
        })
}

const readAllBlog = (req:Request,res:Response) => {

    return Blog.find()
        .then( (blog) => {
            return res.status(200).json({
                count: blog.length,
                message: blog
            })
        })
        .catch( (error) => {
            return res.status(500).json({
                message: error
            })
        })
}

const deleteBlog = (req:Request, res:Response) => {
    const _id = req.params.blogID

    return Blog.findByIdAndDelete(_id)
        .then(() => {
             return res.status(200).json({
                 message: 'Blog deleted'
             })
        })
        .catch((error) => {
            return res.status(200).json({
                message: error
            })
        })
}


export default {
    createBlog,
    readAllBlog,
    readBlog,
    editBlog,
    deleteBlog
}