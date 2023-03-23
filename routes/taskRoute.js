import express from "express"
import { deleteTask, myTasks, newTaks, updateTask } from "../controllers/taskController.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()


router.post('/new',isAuthenticated,newTaks)
router.get('/my',isAuthenticated,myTasks)
router.put('/update/:id',isAuthenticated,updateTask)
router.delete('/delete/:id',isAuthenticated,deleteTask)

export default router