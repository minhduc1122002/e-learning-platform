import { useState, useEffect } from "react";
import React from 'react';
import './LectureList.css';
import EditLecture from "../../components/Modal/Lecture/EditLecture";
import DeleteLecture from '../../components/Modal/Lecture/DeleteLecture';
import AddLesson from '../../components/Modal/Lesson/AddLesson';
import EditLesson from '../../components/Modal/Lesson/EditLesson';
import DeleteLesson from '../../components/Modal/Lesson/DeleteLesson';
import AddLecture from '../../components/Modal/Lecture/AddLecture';
import { useDispatch, useSelector } from 'react-redux'
import { getLectureofCourse } from '../../redux/lectureSlice'
import { toast, ToastContainer } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faAdd } from "@fortawesome/free-solid-svg-icons";

function LectureList( {course_path} ) {
    const dispatch = useDispatch()
    const lectures = useSelector(state => state.lecture.lectures)
    const [checkedState, setCheckedState] = useState([])
    const [addLectureModal, setAddLectureModal] = useState(false)
    const [editLectureModal, setEditLectureModal] = useState(false)
    const [deleteLectureModal, setDeleteLectureModal] = useState(false)
    const [addLessonModal, setAddLessonModal] = useState(false)
    const [editLessonModal, setEditLessonModal] = useState(false)
    const [deleteLessonModal, setDeleteLessonModal] = useState(false)
    const [selectedLecture, setSelectedLecture] = useState({})
    const [selectedLesson, setSelectedLesson] = useState({})
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        if (lectures?.length > 0) {
            setCheckedState(new Array(lectures.length).fill(false))
        } else {
            dispatch(getLectureofCourse(course_path)) 
        }
    }, [dispatch, lectures.length, course_path]);

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
        setCheckedState(updatedCheckedState)
    }

    const handleDeleteLecture = (lecture) => {
        setDeleteLectureModal(true)
        setSelectedLecture(lecture)
    }

    const handleEditLecture = (lecture) => {
        setEditLectureModal(true)
        setSelectedLecture(lecture)
    }

    const handleAddLesson = (lecture) => {
        setAddLessonModal(true)
        setSelectedLecture(lecture)
    }

    const handleEditLesson = (lesson) => {
        setEditLessonModal(true)
        setSelectedLesson(lesson)
    }

    const handleDeleteLesson = (lesson) => {
        setDeleteLessonModal(true)
        setSelectedLesson(lesson)
    }
    return (
        <>
        <ToastContainer limit={1} />
        <AddLecture isOpen={addLectureModal} setIsOpen={setAddLectureModal} course_path={course_path}/>
        <DeleteLecture isOpen={deleteLectureModal} setIsOpen={setDeleteLectureModal} lecture={selectedLecture} setLecture={setSelectedLecture}/>
        <EditLecture isOpen={editLectureModal} setIsOpen={setEditLectureModal} lecture={selectedLecture} setLecture={setSelectedLecture}/>
        <AddLesson isOpen={addLessonModal} setIsOpen={setAddLessonModal} lecture={selectedLecture} setLecture={setSelectedLecture}/>
        <EditLesson isOpen={editLessonModal} setIsOpen={setEditLessonModal} lesson={selectedLesson} setLesson={setSelectedLesson}/>
        <DeleteLesson isOpen={deleteLessonModal} setIsOpen={setDeleteLessonModal} lesson={selectedLesson} setLesson={setSelectedLesson}/>
        <div className="lecture-list">
            {lectures.map((lecture, index) => (
                <div className="lecture-item" key={`lecture-${index + 1}`}>
                    <div className="lecture-box">
                        <div className="lecture-index">{index + 1}</div>
                        <div className="lecture-overview">
                            <h2>{lecture.title}</h2> 
                            <p>{lecture.description}</p>
                        </div>
                        <div className="lecture-view">
                            {user?.isAdmin && <div className="lecture-modify">
                                <div className="add">
                                    <button className="fa-add-lesson" onClick={() => handleAddLesson(lecture)}><FontAwesomeIcon icon={faAdd}/></button>
                                </div>
                                <div className="edit">
                                    <button onClick={() => handleEditLecture(lecture)} className="fa-edit-lecture"><FontAwesomeIcon icon={faEdit}/></button>
                                </div>
                                <div className="delete">
                                    <button onClick={() => handleDeleteLecture(lecture)} id="delete" ><FontAwesomeIcon icon ={faTrash} className="fa-delete-lecture"/></button>
                                </div>
                            </div>}
                            <button type="button" className="view-button" onClick={() => handleOnChange(index)}>
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className={checkedState[index] ? "lesson-list-show" : "lesson-list-hidden"} key={`lecture-lessons-${index + 1}`}>
                        {lecture.lessons.map((lesson, i) => (
                            <div className="lesson-box" key={`lesson-${i + 1}`}>
                                <p>{i + 1}. {lesson.title}</p>
                                {user?.isAdmin && <div className="lesson-modify">
                                    <div className="edit">
                                        <button onClick={() => handleEditLesson(lesson)} className="fa-edit"><FontAwesomeIcon icon={faEdit}/></button>
                                    </div>
                                    <div className="delete">
                                        <button onClick={() => handleDeleteLesson(lesson)} id="delete" ><FontAwesomeIcon icon ={faTrash} className="fa-delete-lesson"/></button>
                                    </div>
                                </div>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {user?.isAdmin && 
                <div className="add">
                    <button className="btn-enhanced" onClick={() => setAddLectureModal(true)}>
                        Add A Lecture
                    </button>
                </div>
            }
        </div>
        </>
    )
}

export default LectureList