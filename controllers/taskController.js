import ErrorHandler from '../middlewares/error.js'
import { Task } from '../models/task.js'

export const newTaks = async (req, res, next) => {
  try {
    const { title, description } = req.body

    await Task.create({
      title,
      description,
      user: req.user,
    })
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const myTasks = async (req, res, next) => {
  try {
    const userid = req.user._id

    const task = await Task.find({ user: userid })
    res.status(200).json({
      success: true,
      task,
    })
  } catch (error) {
    next(error)
  }
}

export const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id

    const task = await Task.findById(id)
    if (!task) return next(new ErrorHandler('Task not found'))
    task.isCompleted = !task.isCompleted

    await task.save()

    res.status(200).json({
      success: true,
      message: 'Task Updated Successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) return next(new ErrorHandler('Task not found', 404))
    await task.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Task Deleted',
    })
  } catch (error) {
    next(error)
  }
}
