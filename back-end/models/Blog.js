const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema(
    {
        creator: {
            type: String,
            required: true 
        },
        title: {
            type: String,
            required: true
        },
        articles: {
            type: String, 
            required: true
        },
        image: {
            type: String, 
            required: false
        },
        likes: {
            type: [String], 
            default: []
        },
        comments: [
            {
                userId: {
                    type: String,
                    required: true
                },
                content: {
                    type: String,
                    required: true
                },
            }, {_id: true, timestamps : true}
        ],
    }, { timestamps : true}
);

module.exports = Blog = mongoose.model('Blogs',  BlogSchema)