import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CreateTask = async(req,res)=>{
    const {task,user_id} = req.body
    console.log(task,user_id)

    // To check all are comming form user input

    if(!task | !user_id){
        return res.status(400).json({
            Success :false,
            Message : "Task and user_id is required"
        })
    }

    const checkUser = await prisma.users.findUnique({
        where:{id:Number(user_id)}
    })
    if(!checkUser){
        return res.status(400).json({
            Success :false,
            Message : "Creater is not exist"
        })
    }

    // To check the email is already in use
    try {
        const response = await prisma.tasks.create({
            data:{
                task,
                user_id : Number(user_id)
            }
        });
    
        return res.status(201).json({
            Success : true,
            Message : "Task created successfully",
            data : {
                id:response.id,
                task:response.task,
                user_id : response.user_id
            }
        })

    
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
        
    }
    
}


