import React, { useEffect } from 'react'
import "./Enroll.css"
import { useNavigate } from "react-router-dom"
import { userRequestText } from "../../request";
import { useDispatch, useSelector } from "react-redux";
import { enroll, reset } from '../../redux/authSlice'

function Enroll( {course} ) {
    const user = useSelector((state) => state.auth.user)
    const { isSuccess } = useSelector(
        (state) => state.auth
    )
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess) {
            navigate(`/learn/${course.path}`)
        }
        dispatch(reset())
    }, [isSuccess, course.path, dispatch])

    const handleEnroll = async (e) => {
        e.preventDefault()
        if (user) {
            dispatch(enroll({
                "userId": user._id, 
                "coursePath": course.path
            }))
        } else {
            navigate("/login")
        }
    }
    return (
        <div className="enroll-container">
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
                <button className="enroll-button" type="button" onClick={handleEnroll}>
                    {user && user.courses.includes(course.path) ? `Go to Course` :`Join the ${course.title} Track`}
                </button>  
            </div>
            <div className="icon-graphics">
                <img alt="Python" src={course.image}/>
            </div>
        </div>
    )
}

export default Enroll