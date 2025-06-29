const express = require('express')
const taskController = require('../controllers/task');

const router = express.Router();

router.post('/', taskController.createTask)
    .get('/', taskController.getAllTasks)
    .get('/:id', taskController.getTaskById)
    .put('/:id', taskController.replaceTask)
    .patch('/:id', taskController.updateTask)
    .delete('/:id', taskController.deleteTask);

exports.router = router;