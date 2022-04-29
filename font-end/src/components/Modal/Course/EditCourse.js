import React, { useState, useEffect } from 'react'
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { updateCoursebyId, reset } from '../../../redux/courseSlice';
import { toast } from 'react-toastify'
import './CourseModal.css'

function EditCourse( {isOpen, setIsOpen, course, setCourse} ) {
    const [inputs, setInputs] = useState({
        path: course.path,
        title: course.title,
        description: course.description,
        code: course.code,
        image: course.image
    })
    const dispatch = useDispatch()
    const { isLoading, isError, message, isSuccess } = useSelector(
        (state) => state.course
    )
    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const handleClose = () => {
        setIsOpen(false)
        setCourse({})
        setInputs({
            path: course.path,
            title: course.title,
            description: course.description,
            code: course.code,
            image: course.image
        })
    }
    useEffect(() => {
        if (isError[1]) {
            toast.error(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: () => {
                  dispatch(reset())
                }
            })
        }
        if (isSuccess[1]) {
            dispatch(reset())
            handleClose()
        }
        toast.clearWaitingQueue();
    }, [isError, message, dispatch, isSuccess])
    
    const handleUpdate = (e) => {
        e.preventDefault()
        dispatch(updateCoursebyId({...inputs, _id: course._id}))
    }
    return (
        <div>
            <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            contentLabel="editmodal"
            className="modal-container"
            overlayClassName="c-modal"
            >
            <div className="modal-content">
                <form className="edit-form">
                <div className="header-edit">
                    <h1>Edit Course</h1>
                </div>

                <div className="edit-form-inputs">
                    <label htmlFor="path" className="label-edit">
                    <strong>PATH</strong>
                    </label>
                    <input
                        name="path"
                        className="input-edit"
                        defaultValue={course.path}
                        onChange={handleChange}
                    />
                </div>

                <div className="edit-form-inputs">
                    <label htmlFor="title" className="label-edit">
                    <strong>TITLE</strong>
                    </label>
                    <input
                        name="title"
                        className="input-edit"
                        defaultValue={course.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="edit-form-inputs">
                    <label htmlFor="description" className="label-edit">
                    <strong>DESCRIPTION</strong>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        style={{height: "120px", width: "100%", resize: "vertical"}}
                        defaultValue={course.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="edit-form-inputs">
                    <label htmlFor="code" className="label-edit">
                    <strong>CODE</strong>
                    </label>
                    <textarea
                        id="code"
                        name="code"
                        style={{height: "120px", width:"100%", resize: "vertical"}}
                        defaultValue={course.code}
                        onChange={handleChange}
                    />
                </div>

                <div className="edit-form-inputs">
                    <label htmlFor="image" className="label-edit">
                    <strong>IMAGE</strong>
                    </label>
                    <input
                        type="link"
                        name="image"
                        className="input-edit"
                        defaultValue={course.image}
                        onChange={handleChange}
                    />
                </div>
                <div className="btn-list">
                    <button className="btn-primary" type='button' onClick={handleUpdate} disabled={isLoading[1] || isError[1]}>Submit</button>
                    <button className="btn-secondary" onClick={handleClose} type='button'>Cancel</button>
                </div>
                </form>
            </div>
            </Modal>
        </div>
    )
}
Modal.setAppElement("#root");
export default EditCourse