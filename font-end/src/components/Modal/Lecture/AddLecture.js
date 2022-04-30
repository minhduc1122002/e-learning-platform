import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import { addLecture, reset } from '../../../redux/lectureSlice';
import { toast } from 'react-toastify'
import './LectureModal.css'

function AddLecture( {isOpen, setIsOpen, course_path} ) {
    const [inputs, setInputs] = useState({})
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const { message } = useSelector(
        (state) => state.lecture
    )
    const isSuccess = useSelector(
        (state) => state.lecture.isSuccess[0]
    )
    const isError = useSelector(
        (state) => state.lecture.isError[0]
    )
    const isLoading = useSelector(
        (state) => state.lecture.isLoading[0]
    )

    const handleClose = useCallback(() => {
        setIsOpen(false)
        setInputs({})

    } ,[setIsOpen])

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

    const handleAdd = (e) => {
        e.preventDefault()
        dispatch(addLecture({...inputs, course_path: course_path}))
    }
    return (
        <div>
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
                    <h1>Add Lecture</h1>
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
                        <strong>DESCRIPTION</strong>
                    </label>
                    <textarea
                        id="description"
                        type="description"
                        name="description"
                        style={{height: "120px", width: "100%", resize: "vertical"}}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="btn-list">
                    <button className="btn-primary" onClick={handleAdd} type="button" disabled={isLoading || isError}>Submit</button>
                    <button className="btn-secondary" onClick={handleClose} type="button">Cancel</button>
                    </div>
                </form>
                </div>
            </div>
            </Modal>
        </div>
    )
}
Modal.setAppElement("#root");
export default AddLecture