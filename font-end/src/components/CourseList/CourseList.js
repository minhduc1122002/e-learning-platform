import React from 'react'
import "./CourseList.css"
function CourseList( {courses} ) {
    return (
        <div className="list-container">
            <div className="section-header">
                <h2 className="info">
                    Explore
                    <br/>
                    50 programming languages
                </h2>    
            </div>
            {courses && (<div className="course-list">
                {courses.map(course => (
                    <a className="course-item" href={`/course/${course.path}`} key={course.path}>
                        <img alt={course.path} className={course.path} src={course.image}/>
                        <div className="title">{course.title}</div>
                        <div className="students-count">172434 students</div>
                    </a>
                ))}
            </div>)}
        </div>
    )
}

export default CourseList