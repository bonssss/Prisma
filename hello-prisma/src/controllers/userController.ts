
import { prisma } from "../../lib/prisma.js";
import { Request,Response } from "express";
export const getUser = async(req:Request,res:Response)=>{
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
        
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({error:error.message});
        }
        else{
            return res.status(500).json({error:"Something went wrong"});
        }
    }
}


export const createUser = async(req:Request,res:Response)=>{
    try {
        const {name,email} = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Missing name or email' });
        }
        if (!email.includes("@")) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        const userExists = await prisma.user.findUnique({
            where:{
                email,
            },
        })
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const user = await prisma.user.create({
            data:{
                name,
                email,
            },
        })
        res.status(201).json(user);
        
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({error:error.message});
        }
        else{
            return res.status(500).json({error:"Something went wrong"});
        }
    }
    
}

//get user by id

export const getUserById = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
       
        const user = await prisma.user.findUnique({
            where:{
                id:Number(id),
            },
        })
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        res.status(200).json(user);
        
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({error:error.message});
        }
        else{
            return res.status(500).json({error:"Something went wrong"});
        }
    }
}

//update user

export const updateUser = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const {name,email} = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Missing id' });
        }
        const user = await prisma.user.update({
            where:{
                id:Number(id),
            },
            data:{
                name,
                email,
            },
        })
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
        
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({error:error.message});
        }
        else{
            return res.status(500).json({error:"Something went wrong"});
        }
    }
}

//delete user

export const deleteUser = async(req:Request,res:Response)=>{
    const {id} = req.params;
    try{
        const user = await prisma.user.findUnique({
            where:{
                id:Number(id)
            }
        })
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const deleteUser = await prisma.user.delete({
            where:{
                id:Number(id)
            }
        })
     
        res.status(200).json({message:"User deleted successfully"})
        
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: 'Failed to delete user' });
    }

}

