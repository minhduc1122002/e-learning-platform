const mongoose = require("mongoose")

const LectureSchema = new mongoose.Schema(
    {
        course_path: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String, 
            required: false
        },
        lessons: [
            {
                title: {
                    type: String,
                    required: true
                },
                articles: {
                    type: String,
                    default: ""
                },
                video: {
                    type: String,
                    default: ""
                },
                examples: {
                    type: Array
                }
            }
        ],
    }, 
    { timestamps : true}
);

module.exports = Lecture = mongoose.model('Lectures',  LectureSchema)