import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCourseList } from '../../redux/courseSlice'
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'
import "./Search.css"
import EditCourse from "../../components/Modal/Course/EditCourse"
import AddCourse from '../../components/Modal/Course/AddCourse'
import { ToastContainer } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteCourse from '../../components/Modal/Course/DeleteCourse'

function Search() {
    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    const { courses } = useSelector(
        (state) => state.course
    )
    const user = useSelector(state => state.auth.user)
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState({})

    useEffect(() => {
        dispatch(getCourseList())
    }, [dispatch])

    const handleEdit = (course) => {
        setSelectedCourse(course)
        setEditModal(true)
    }

    const handleDelete = (course) => {
        setSelectedCourse(course)
        setDeleteModal(true)
    }
    return (
        <>
            <ToastContainer limit={1} />
            {addModal && <AddCourse isOpen={addModal} setIsOpen={setAddModal} />}
            {editModal && <EditCourse isOpen={editModal} setIsOpen={setEditModal} course={selectedCourse} setCourse={setSelectedCourse}/>}
            {deleteModal && <DeleteCourse isOpen={deleteModal} setIsOpen={setDeleteModal} course={selectedCourse} setCourse={setSelectedCourse} />}
            <Navigation/>
            <header className="tracks-header">
                <div className="lg-container container">
                    <h1>{courses.length} languages for you to master</h1>
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
                                    <div className="result-item" key={course.path}>
                                        <a href={`/course/${course.path}`}>
                                            <img alt={course.path} className="big-icon" src={course.image}/>
                                            <div className='result-info'>
                                                <div className="heading">
                                                    <img alt={course.path} className="small-icon" src={course.image}/>
                                                    <h3 className="title">{course.title}</h3>
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
                                        {user?.isAdmin && 
                                            <div className='modify-btn'>
                                                <div className="edit">
                                                    <button onClick={() => handleEdit(course)} className="fa-edit"><FontAwesomeIcon icon={faEdit}/></button>
                                                </div>
                                                <div className="delete">
                                                    <button onClick={() => handleDelete(course)} className="delete-fa-icon"><FontAwesomeIcon icon ={faTrash}/></button>
                                                </div>
                                            </div>
                                        }
                                </div>
                            ))}
                        </div>
                        <div className="add">
                            {user?.isAdmin && 
                                <button className="btn-enhanced" onClick={() => setAddModal(true)}>
                                    Add A Course
                                </button>
                            }   
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    )
}

export default Search