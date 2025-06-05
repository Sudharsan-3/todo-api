import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const TaskById = async(req,res)=>{
    const {user_id,task_id} = req.body

    if(!user_id||!task_id){
        return res.status(400).json({
            Success :false,
            Message : "user_id and task_id are required"
        })
    }
    
    try {

        const checkUser = await prisma.users.findUnique({
            where: { id: Number(user_id) },
          });
      
          // 3. Check if task exists
          const checkTask = await prisma.tasks.findUnique({
            where: { id: Number(task_id) },
          });
      
          if (!checkUser || !checkTask) {
            return res.status(404).json({
              Success: false,
              Message: "Creator or Task not found",
            });
          }
      
          // 4. Check if task belongs to the creator
          if (checkTask.user_id !== Number(user_id)) {
            return res.status(403).json({
              Success: false,
              Message: "You are not authorized to access this task",
            });
          }

        const response = await prisma.tasks.findUnique({
            where:{id:Number(task_id)}
        });
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


