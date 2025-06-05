import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Login = async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password) {
       return res.status(400).json({
            Success : false,
            Message : "Enter both email and password",
        })
    }


    try {
        const response = await prisma.users.findUnique({
            where : {email},
        });
        if (!response || response.password !== password) {
            return res.status(401).json({
              Success: false,
              Message: "Invalid credentials",
            });
          }

        res.status(202).json({
            Success : true,
            Message : "Login successfully",
            user : {
                id: response.id,
                name : response.name,
                email : response.email,
            }
        })
        
    } catch (error) {
        
    }
}


