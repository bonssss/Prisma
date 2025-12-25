import { prisma } from "./lib/prisma.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());



app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.post('/users', async (req, res)=>{
    const {name ,email} = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Missing name or email' });
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
        const user = await prisma.user.create({
        data: {
            name,
            email,
        },
    })
    res.status(201)
    res.json(user);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create user' });
        
    }
    
})

app.get('/users/:id', async (req, res)=>{
    const {id}= req.params;
    const user = await prisma.user.findUnique({
        where:{
            id:Number(id)
        }
    })
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
})


app.listen(3333, () => {
    console.log('Server running on port 3333');
});