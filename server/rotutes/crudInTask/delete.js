import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DeleteTask = async (req, res) => {
  const { creator_id, task_id } = req.body;
  console.log(creator_id, task_id);

  // 1. Check input
  if (!creator_id || !task_id) {
    return res.status(400).json({
      Success: false,
      Message: "creator_id and task_id are required",
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

    // 4. Check if task belongs to the creator
    if (checkTask.user_id !== Number(creator_id)) {
      return res.status(403).json({
        Success: false,
        Message: "You are not authorized to delete this task",
      });
    }

    // 5. Delete the task
    await prisma.tasks.delete({
      where: { id: Number(task_id) },
    });

    return res.status(200).json({
      Success: true,
      Message: "Task deleted successfully",
    });

  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({
      Success: false,
      Message: "Server error",
      error: error.message,
    });
  }
};

