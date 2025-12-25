import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  throw new Error("JWT environment variables not set");
}

export const hashPassword = async(password:string)=>{
    return await bcrypt.hash(password,10);
}


export const comparePassword = async(password:string,hash:string)=>{
    return await bcrypt.compare(password,hash);
}



export const generateToken = (userId:number)=>{
    return jwt.sign({userId},JWT_SECRET!,{expiresIn:JWT_EXPIRES_IN});
}