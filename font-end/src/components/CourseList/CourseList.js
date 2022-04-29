import React from 'react'
import { getCourseList } from '../../redux/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import "./CourseList.css"

function CourseList() {
    const dispatch = useDispatch()
    const courses = useSelector(state => state.course.courses)
    
    useEffect(() => {
        dispatch(getCourseList())
    }, [dispatch]);

    return (
        <div className='course-list-component'>
            <div className="list-container">
                <div className="section-header">
                <div className="icon-hex">
                    <img role="presentation" alt="" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/tracks-2e780b460e113a9b07ce4446c988a31c40547b00.svg"/>
                </div>
                    <h2 className="info">
                        Explore and get fluent in
                        <br/>
                        {courses.length} programming languages
                    </h2>
                    <hr className="divider-large"/> 
                </div>
                {courses && (<div className="course-list">
                    {courses.map((course, index) => index < 6 && (
                        <a className="course-item" href={`/course/${course.path}`} key={course.path}>
                            <img alt={course.path} className={course.path} src={course.image}/>
                            <div className="title">{course.title}</div>
                            <div className="students-count">{course.totalStudents} students</div>
                        </a>
                    ))}
                </div>)}
                <div className="border-view">
                    <a href="/courses">
                        <span>See all {courses.length} Language Tracks</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CourseList