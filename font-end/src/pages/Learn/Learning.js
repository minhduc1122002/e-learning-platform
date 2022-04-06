import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../request";
import { Link } from 'react-router-dom'
import Lesson from "../../components/Lesson/Lesson";
import { useSelector } from "react-redux";
import Navigation from "../../components/Navigation/Navigation";
import "./Learning.css"
import Footer from "../../components/Footer/Footer";
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Learning() {
    const location = useLocation()
    const course_path = location.pathname.split("/")[2]
    const lesson_id = location.pathname.split("/")[3]
    const [lectures, setLectures] = useState([])
    const [isActive, setIsActive] = useState(false)
    const { courses } = useSelector((state) => state.auth.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!courses.includes(course_path)) {
            return navigate(`/course/${course_path}`)
        }
        const getLectures = async () => {
            try {
                const res = await publicRequest.get(`/lectures/findby/${course_path}`)
                setLectures(res.data)
                if (!lesson_id) {
                    navigate(`/learn/${course_path}/${res.data[0].lessons[0]._id}`)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getLectures()
    }, [course_path, courses, navigate, lesson_id])

    
    return (
        <>
        <Navigation/>
        <div className="learn">
            <div className="navigation-compact">
                <div className="learn-btn" onClick={(e) => setIsActive(!isActive)}>
                    <FontAwesomeIcon icon={faBars}/>
                    Item Navigation
                </div>
            </div>
            {isActive && (
                <div className="dropdown-list">
                {lectures.map(lecture => (
                    <div className="lecture-item" key={lecture.title}>
                        <h2>{lecture.title}</h2>
                        <div className="lessons">
                            {lecture.lessons?.map(lesson => (
                                <Link to={`/learn/${course_path}/${lesson._id}`}>
                                    <div className={lesson._id == lesson_id ? "lesson-item selected" : "lesson-item"} key={lesson._id}>
                                        {lesson.title}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
                </div>
            )}
            <div className="learn-navigation">
                {lectures.map(lecture => (
                    <div className="lecture-item" key={lecture.title}>
                        <h2>{lecture.title}</h2>
                        <div className="lessons">
                            {lecture.lessons?.map(lesson => (
                                <Link to={`/learn/${course_path}/${lesson._id}`}>
                                    <div className={lesson._id == lesson_id ? "lesson-item selected" : "lesson-item"} key={lesson._id}>
                                        {lesson.title}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {lesson_id && <Lesson lessonId={lesson_id}/>} 
        </div>
        <Footer/>
        </>
    );
  }
  
  export default Learning;