import React, { useState, useEffect, useCallback } from 'react'
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { addCourse, reset } from '../../../redux/courseSlice';
import { toast } from 'react-toastify'
import './CourseModal.css'

function AddCourse( {isOpen, setIsOpen} ) {
    const [inputs, setInputs] = useState({})
    const dispatch = useDispatch()
    const { message } = useSelector(
        (state) => state.course
    )
    const isSuccess = useSelector(
        (state) => state.course.isSuccess[0]
    )
    const isError = useSelector(
        (state) => state.course.isError[0]
    )
    const isLoading = useSelector(
        (state) => state.course.isLoading[0]
    )
    const handleClose = useCallback(() => {
        setIsOpen(false)
        setInputs({})
    }, [setIsOpen])

    useEffect(() => {
        if (isError) {
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
        if (isSuccess) {
            dispatch(reset())
            handleClose()
        }
        toast.clearWaitingQueue();
    }, [isError, message, dispatch, isSuccess, handleClose])

    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
    }
    const handleAdd = (e) => {
        e.preventDefault()
        dispatch(addCourse(inputs))
    }
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={handleClose}
                contentLabel="addmodal"
                className="modal-container"
                overlayClassName="c-modal"
            >
            <div className="modal-content">
                <div className="add-field">
                <form className="add-form">
                    <div className="header-add">
                    <h1>Add Course</h1>
                    </div>

                    <div className="add-form-inputs">
                    <label htmlFor="path" className="label-add">
                        <strong>PATH (Required)</strong>
                    </label>
                    <input
                        id="path"
                        type="text"
                        name="path"
                        className="input-add"
                        placeholder="Path"
                        onChange={handleChange}
                    />
                    </div>

                    <div className="add-form-inputs">
                    <label htmlFor="title" className="label-add">
                        <strong>TITLE (Required)</strong>
                    </label>
                    <input
                        id="title"
                        type="title"
                        name="title"
                        className="input-add"
                        placeholder="Title"
                        onChange={handleChange}
                    />
                    </div>

                    <div className="add-form-inputs">
                    <label htmlFor="description" className="label-add">
                        <strong>DESCRIPTION (Required)</strong>
                    </label>
                    <textarea
                        id="description"
                        type="description"
                        name="description"
                        style={{height: "120px", width: "100%", resize: "vertical"}}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="add-form-inputs">
                    <label htmlFor="code" className="label-add">
                        <strong>CODE</strong>
                    </label>
                    <textarea
                        id="code"
                        type="code"
                        name="code"
                        style={{height: "120px", width:"100%", resize: "vertical"}}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="add-form-inputs">
                    <label htmlFor="image" className="label-add">
                        <strong>IMAGE</strong>
                    </label>
                    <input
                        id="image"
                        type="link"
                        name="image"
                        className="input-add"
                        placeholder="Image"
                        onChange={handleChange}
                    />
                    </div>
                    <div className="btn-list">
                    <button className="btn-primary" type='button' onClick={handleAdd} disabled={isLoading || isError}>Submit</button>
                    <button className="btn-secondary" onClick={handleClose} type='button'>Cancel</button>
                    </div>
                </form>
                </div>
            </div>
            </Modal>
        </>
    )
}
Modal.setAppElement("#root");
export default AddCourse