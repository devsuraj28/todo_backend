const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Title is Required"],
        trim: true,
        minlength: [3, "Title can't be less than 3 Characters"],
        maxlength: [100, "Title can't be more than 100 Characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: [10, "Description must be at least 10 characters long"],
        maxlength: [1000, "Description cannot exceed 1000 characters"]
    },
    priority: {
        type: String,
        trim: true,
        enum: {
            values: ["Low", "Medium", "High"],
            message: "Invalid priority"
        },
        default: "Low"
    },
    dueDate: Date,
    syncedAt: Date,
    isSynced: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    syncStatus: { type: String, enum: ['pending', 'synced', 'failed'], default: 'pending' },
    lastUpdatedBy: { type: String, enum: ['local', 'remote'], default: 'local' },
    deviceId: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }


}, { timestamps: true });

exports.taskSchema = mongoose.model("Tasks", taskSchema);