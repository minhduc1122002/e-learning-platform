const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema(
    {
        path: {
            type: String, 
            required: true, 
        },
        title: {
            type: String, 
            required: true,
        },
        description: {
            type: String, 
            required: true
        },
        code: {
            type: String
        },
        image: {
            type: String,
            default: ""
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Courses", CourseSchema)