import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GetAllTask = async(req,res)=>{
    
    try {
        const response = await prisma.tasks.findMany();
        return res.status(201).json({
            Success : true,
            Message : "Task loaded successfully",
            data :  response
        })

    
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
        
    }
    
}


