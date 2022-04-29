import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../request";
import { Link } from 'react-router-dom'
import Lesson from "../../components/Lesson/Lesson";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Navigation/Navigation";
import "./Learning.css"
import Footer from "../../components/Footer/Footer";
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLectureofCourse } from "../../redux/lectureSlice";
import Welcome from "../../components/Welcome/Welcome";

function Learning() {
    const location = useLocation()
    const course_path = location.pathname.split("/")[2]
    const lesson_id = location.pathname.split("/")[3]

    const [isActive, setIsActive] = useState(false)
    const { courses } = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const lectures = useSelector(state => state.lecture.lectures)
    
    useEffect(() => {
        if (!courses.includes(course_path)) {
            return navigate(`/course/${course_path}`)
        }
        dispatch(getLectureofCourse(course_path))
    }, [course_path, dispatch, courses, navigate])

    
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
            {lectures.length > 0 && <div className="learn-navigation">
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
            </div>}
            {lesson_id ? <Lesson lessonId={lesson_id}/> : <Welcome lectures={lectures} course={course_path[0].toUpperCase() + course_path.substring(1)}/>} 
        </div>
        <Footer/>
        </>
    );
  }
  
  export default Learning;