import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const UpdateTask = async (req, res) => {
  const { creator_id, task_id, task } = req.body;
  console.log(creator_id, task_id, task);

  // 1. Check input
  if (!creator_id || !task_id || !task) {
    return res.status(400).json({
      Success: false,
      Message: "task, creator_id, and task_id are required",
    });
  }

  try {
    // 2. Check if user exists
    const checkUser = await prisma.users.findUnique({
      where: { id: Number(creator_id) },
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

    // 4. Check if the creator is authorized
    if (checkTask.user_id !== Number(creator_id)) {
      return res.status(403).json({
        Success: false,
        Message: "You are not authorized to update this task",
      });
    }

    // 5. Update the task
    const response = await prisma.tasks.update({
      where: { id: Number(task_id) },
      data: {
        task, // Ensure `task` has valid keys like task_name, description, etc.
      },
    });

    return res.status(200).json({
      Success: true,
      Message: "Task updated successfully",
      data: response,
    });

  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({
      Success: false,
      Message: "Server error",
      error: error.message,
    });
  }
};
