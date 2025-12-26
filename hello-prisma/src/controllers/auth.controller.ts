import { generateToken, hashPassword,comparePassword } from "../utils/auth.js";
import { prisma } from "../../lib/prisma.js";
import { Request,Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const registerUser = async (req:Request, res:Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing name, email, or password' });
    }
    if (!email.includes("@")) {
        return res.status(400).json({ error: 'Invalid email' });
    }
    // duplicate email
    const userExists = await prisma.user.findUnique({
        where: {
            email,
        },
    })
    if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
    }
    try {
    const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
        data: {
            name,
            email,
            password:hashedPassword,

        },
    })
    res.status(201)
    res.json(user);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create user' });
        
    }
    
}

export const loginUser = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
    }
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password' });
    }
    const token = generateToken(user.id);
    res.json({ message: 'Login successful', token , user:{id:user.id,name:user.name,email:user.email}});
}



// export const getUserProfile = async (req: any, res: any) => {
//   const user = await prisma.user.findUnique({
//     where: { id: Number(req.userId) },


//     select: { id: true, email: true, name: true },
//   });

//   res.json(user);
// }

// export const updateProfile = async (req: any, res: any) => {
//     const { name, email } = req.body;
//     const user = await prisma.user.update({
//         where: { id: Number(req.userId) },
//         data: { name, email },
//     });
//     res.json(user);
// }
export const createProfile = async (req: any, res: any) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'Missing firstName or lastName' });
  }

  try {
    const profile = await prisma.profile.create({
      data: {
        firstName,
        lastName,
        user: {
          connect: { id: Number(req.userId) }, // connect authenticated user
        },
      },
    });

    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserProfile = async (req:any,res:any)=>{
    try {
        const profile = await prisma.profile.findUnique({
            where:{
                userId:Number(req.userId)
            }
        })
        if(!profile){
            return res.status(404).json({error:'Profile not found'})
        }
        res.json(profile)
        
    } catch (error:any) {
        res.status(500).json({error:error.message})
        
    }
}


export const updateProfile = async (req:any,res:any)=>{
    const {firstName,lastName} = req.body;
    if(!firstName || !lastName){
        return res.status(400).json({error:'Missing firstName or lastName'})
    }
    try {
        const profile = await prisma.profile.update({
            where:{
                userId:Number(req.userId)
            },
            data:{
                firstName,
                lastName
            }
        })
        res.json(profile)
        
    } catch (error:any) {
        res.status(500).json({error:error.message})
        
    }
    
}