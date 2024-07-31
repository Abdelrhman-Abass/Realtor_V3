import prisma from "../lib/prisma.js";
import bcrypt from 'bcrypt'

export const getUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany()

        res.status(200).json(users)
    } catch (error) {
        console.log(error);

        res.status(500).json({message:"Failed to get users"});
    }
}
export const getUser = async (req, res, next) => {

    const id  = req.params.id
    try {
        const user = await prisma.user.findMany({
            where:{id},
        })

        res.status(200).json(user)
    } catch (error) {
        console.log(error);

        res.status(500).json({message:"Failed to get users"});
    }
}


export const updateUSer = async (req, res, next) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const {password ,avatar ,...inputs } = req.body

    if(id !== tokenUserId) {
        return res.status(403).json({massage:"Not Authorized"})
    }

    let updatedPassword = null
    try {

        if(password){
            updatedPassword = await bcrypt.hash(password,12)
        }

        const updatedUser = await prisma.user.update({
            where:{id},
            data:{
                ...inputs,
                ...(updatedPassword && {password:updatedPassword}),
                ...(avatar && {avatar:avatar})
            }
        })

        res.status(200).json({updatedUser})


    } catch (error) {
        console.log(error);

        res.status(500).json({message:"Failed to get users"});
    }
}


export const deleteUser = async (req, res, next) => {

    const id = req.params.id;
    const tokenUserId = req.userId;

    if(id !== tokenUserId) {
        return res.status(403).json({massage:"Not Authorized"})
    }

    try {
        await prisma.user.delete({
            where:{id}
        })
        res.status(200).json({massage:"User Deleted"})
    } catch (error) {
        console.log(error);

        res.status(500).json({message:"Failed to get users"});
    }
}