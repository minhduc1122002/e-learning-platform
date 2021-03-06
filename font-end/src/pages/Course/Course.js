import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../request";
import Navigation from "../../components/Navigation/Navigation";
import './Course.css'
import LectureList from "../../components/LectureList/LectureList";
import Footer from "../../components/Footer/Footer";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import ReactMarkdown from 'react-markdown'
import Enroll from "../../components/Enrollment/Enroll";
import { useDispatch, useSelector } from 'react-redux';
import { getCourse } from '../../redux/courseSlice'

function Course() {
    const location = useLocation()
    const [hidden, setHidden] = useState(true)
    const path = location.pathname.split("/")[2]
    const course = useSelector(state => state.course.course)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCourse(path))
    }, [dispatch, path]);
    
    return (
        <>
        {course && (
            <>
            <Navigation/>
            <div className="course-container">
                <div className="header">
                    <div className="lg-container">
                        <div className="header-content">
                            <img className="icon" alt="JavaScript" src={course.image}/>
                            <div className="header-text">
                                <div className="title">{course.title}</div>
                                <div className="students">
                                    <img role="presentation" alt="" src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/students-caf4c344871c7bb1e0988f33a3ead0944160d4e0.svg"/>
                                    <span>
                                        {course.totalStudents}
                                        {" "}students
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Enroll course={course}/>
                <div className="lg-container">
                    <div className="course-info">
                        <div className="about-text">
                            <h2>About {course.title}</h2>
                            <div className={hidden ? "about-text-desc hidden-overflow" : "about-text-desc"}>
                                <ReactMarkdown children={course.description} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} className="markdown-container"/>
                            </div>
                            <button type="button" onClick={() => setHidden(!hidden)}>{hidden ? `Read more on ${course.title}` : "Read less"}</button>
                        </div>
                        <SyntaxHighlighter
                            className="code-holder"
                            children={course.code}
                            style={oneLight}
                            language={course.path}
                            PreTag="div"
                        />
                    </div>
                </div>
                <div className="syllabus-info">
                    <div className="syllabus">
                        <div className="syllabus-header">
                            <h2>Your journey through {course.title}</h2>
                            <p>Learn and master concepts to achieve fluency in {course.title}.</p>
                        </div>
                        {course.path && <LectureList course_path={course.path}/>}
                    </div>
                </div>
            </div>
            <Footer/>
            </>)}
        </>
    );
  }
  
  export default Course;