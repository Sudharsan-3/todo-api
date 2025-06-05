import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CreateUser = async(req,res)=>{
    const {name,email,password} = req.body
    console.log(name,email,password)

    // To check all are comming form user input

    if(!name | !email | !password){
        return res.status(400).json({
            Success :false,
            Message : "Name ,eamil and password are required"
        })
    }

    // To check the email is already in use
    try {
        const exsistingUser = await prisma.users.findUnique({
            where:{email}
        });

        if( exsistingUser ){
            return res.status(409).json({
                Success : false,
                Message : `You enter the exsiting email id ${email}`,
                status : 409,
            })
        }

        // Creating the user

        const response = await prisma.users.create({
            data:{
                name,
                email,
                password
            }
        });
        return res.status(201).json({
            Success : true,
            Message : "User created successfully",
            user : {
                id:response.id,
                name:response.name,
                email:response.email,
                created_at :response.created_at,
            }
        })

    
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
        
    }
    
}


