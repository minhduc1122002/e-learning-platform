import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCourseList } from '../../redux/courseSlice'
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'
import "./Search.css"
import Edit from "../../ModificationCourse/Edit/Edit"
import Delete from "../../ModificationCourse/Delete/Delete";
import Add from '../../ModificationCourse/Add/Add'

function Search() {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const courses = useSelector(state => state.course.courses)
    
    useEffect(() => {
        dispatch(getCourseList())
    }, [dispatch]);

    return (
        <>
            <Navigation/>
            <header className="tracks-header">
                <div className="lg-container container">
                    <h1>57 languages for you to master</h1>
                    <p>
                        Become fluent in your chosen programming languages by completing these tracks created by our
                        <a href="/"> awesome team of contributors</a>
                    </p>
                </div>
            </header>
            <div className='search-container'>
                <section className="c-search-bar">
                    <div className="lg-container">
                        <input type="text" placeholder="Search language tracks" className='search-bar' onChange={(e) => setInput(e.target.value)}/>
                    </div>
                </section>
                <section className='courses'>
                    <div className="lg-container">
                        <div className='result-courses'>
                            {courses.filter(course => 
                                course.title.toLowerCase().includes(input.toLowerCase())
                                ).map(course => (
                                    <a href={`/course/${course.path}`} className="result-item" key={course.path}>
                                        <img alt={course.path} className="big-icon" src={course.image}/>
                                        <div className='result-info'>
                                            <div className="heading">
                                                <img alt={course.path} className="small-icon" src={course.image}/>
                                                <h3 className="title">{course.title}</h3>
                                                <div className="modify-btn">
                                                    <Edit />
                                                    <Delete />
                                                </div>
                                            </div>
                                            <ul className="counts"> 
                                                <li>
                                                    <img src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/exercises-8a7df249fbfb76cc18efbbee844d9bd742830404.svg" alt="Number of lectures" className="r-icon"/>
                                                    {course.totalLectures} lectures
                                                </li>
                                                <li>
                                                    <img src="https://d24y9kuxp2d7l2.cloudfront.net/assets/icons/concepts-982e268a7b685697712765d69d08e624c07a611a.svg" alt="Number of lessons" className="r-icon"/>
                                                    {course.totalLessons} lessons
                                                </li>
                                            </ul>
                                        </div>
                                    </a>
                            ))}
                            <Add />
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    )
}

export default Search