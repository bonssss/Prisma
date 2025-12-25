
import { prisma } from "../../lib/prisma.js";
import { Request,Response } from "express";
export const getUser = async(req:Request,res:Response)=>{
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({error:error.message});
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
        res.status(500).json({error:error.message});
    }
    
}