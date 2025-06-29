const Task = require('../models/task');

exports.createTask = async (req, res) => {

    try {
        const task = new Task.taskSchema(req.body);
        const newTask = await task.save();
        res.status(201).json({ message: "Task saved successfully", data: newTask });

    }
    catch (error) {
        res.status(400).json({ message: "Failed to create task", error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.taskSchema.find();
        res.status(200).json({ message: "Tasks retrieved successfully", data: tasks });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.taskSchema.findById({'_id':req.params.id});
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task retrieved successfully", data: task });
    } catch (error) {
        res.status(400).json({ message: "Invalid task ID", error: error.message });
    }   
};



exports.replaceTask = async (req, res) => {
    try {
        const task = await Task.taskSchema.findOneAndReplace(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: false }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task replaced successfully", data: task });
    } catch (error) {
        res.status(400).json({ message: "Failed to replace task", error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.taskSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully", data: task });
    } catch (error) {
        res.status(400).json({ message: "Failed to update task", error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.taskSchema.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete task", error: error.message });
    }
};

