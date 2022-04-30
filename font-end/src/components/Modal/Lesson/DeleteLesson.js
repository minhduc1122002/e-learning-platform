import React, { useCallback, useEffect } from 'react'
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { deleteLessontoLecture, reset } from '../../../redux/lectureSlice';
import { toast } from 'react-toastify'

function DeleteLesson( {isOpen, setIsOpen, lesson, setLesson} ) {
    const dispatch = useDispatch()
    const { message } = useSelector(
        (state) => state.lecture
    )
    const isSuccess = useSelector(
        (state) => state.lecture.isSuccess[6]
    )
    const isError = useSelector(
        (state) => state.lecture.isError[6]
    )
    const isLoading = useSelector(
        (state) => state.lecture.isLoading[6]
    )
    const handleClose = useCallback(() => {
        setIsOpen(false)
        setLesson({})
    }, [setIsOpen, setLesson])
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

    const handleDeleteLesson = (e) => {
        e.preventDefault()
        dispatch(deleteLessontoLecture(lesson._id))
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
            <h2 className="delete-label">Are you sure to delete this lesson?</h2>
            <div className="btn-list">
                <button className="btn-primary" onClick={handleDeleteLesson} disabled={isLoading || isError}>Submit</button>
                <button className="btn-secondary" onClick={handleClose}>Cancel</button>
            </div>
            </div>
        </Modal>
        </div>
    )
}
Modal.setAppElement("#root");
export default DeleteLesson