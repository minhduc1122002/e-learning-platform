import React from 'react'
import "github-markdown-css/github-markdown-light.css"

function Welcome( {lectures, course} ) {
  return (
    <div className='lesson'>
        <div className='lesson-content'>
            <div className='markdown-body'>
                <h1>Welcome To {course} Course</h1>
                <p>Get Started By Choosing A Lesson From The Navigation On Your Left.</p>
                <p>Below is the complete guide as to how to get started with {course} and make yourself proficient in it.</p>
                {lectures.map(lecture => (
                    <ul>
                        <li><strong>{lecture.title}</strong> : {lecture.description}</li>
                    </ul>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Welcome