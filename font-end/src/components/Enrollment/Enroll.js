import React, { useEffect } from 'react'
import "./Enroll.css"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { enroll, reset } from '../../redux/authSlice'

function Enroll( {course} ) {
    const user = useSelector((state) => state.auth.user)
    const enrollSuccess = useSelector(
        (state) => state.auth.isSuccess[2]
    )
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (enrollSuccess) {
            navigate(`/learn/${course.path}`)
            dispatch(reset())
        }
    }, [enrollSuccess, course.path, dispatch, navigate])

    const handleEnroll = (e) => {
        e.preventDefault()
        if (!user) {
            return navigate("/login")
        }
        if (!user.courses.includes(course.path)) {
            dispatch(enroll({
                "userId": user._id, 
                "coursePath": course.path
            }))
        } else if (user.courses.includes(course.path)) {
            return navigate(`/learn/${course.path}`)
        }
    }
    return (
        <div className="enroll-container">
            <div className="enroll-content">
                <div className="enroll-intro">
                    <h1>Want to learn and master {course.title}?</h1>
                    <p>
                        Join Exercism’s {course.title} Track for access to {" "}
                        <em className="c-underline">
                            <strong>131 exercises</strong>
                        </em>
                        {" "}grouped into 14 {course.title} Concepts, all{" "}
                        <em className="c-underline">
                            <strong>100% free.</strong>
                        </em>
                    </p>
                    <div className='button-holder'>
                        <button className="btn-primary" type="button" onClick={handleEnroll}>
                            {user && user.courses.includes(course.path) ? `Go to Course` :`Join the ${course.title} Track`}
                        </button>
                    </div>
                </div>
                <div className="icon-graphics">
                    <img alt="Python" src={course.image}/>
                </div>
            </div>
        </div>
    )
}

export default Enroll