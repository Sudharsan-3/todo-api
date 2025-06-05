import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import { CreateUser } from "./rotutes/create&login/createUser.js";
import dotenv from 'dotenv';
import { Login } from "./rotutes/create&login/loginUser.js";
import { CreateTask } from "./rotutes/crudInTask/create.js";
import { DeleteTask } from "./rotutes/crudInTask/delete.js";
import { GetAllTask } from "./rotutes/crudInTask/read.js";
import { UpdateTask } from "./rotutes/crudInTask/update.js";
import { TaskById } from "./rotutes/crudInTask/taskById.js";


dotenv.config();


const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.use("/api/create-user",CreateUser)

app.use("/api/login",Login)


// CRUD todo task

app.use("/api/create-task",CreateTask)

app.use("/api/delete-task",DeleteTask)

app.use("/api/get-all-tasks",GetAllTask)

app.use("/api/update-task", UpdateTask);

app.use("/api/task-by-id",TaskById)


app.listen(PORT,()=>{
    console.log(`Your server is running on port ${PORT}`)
});



