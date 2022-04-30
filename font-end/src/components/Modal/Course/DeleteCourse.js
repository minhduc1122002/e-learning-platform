import React, { useCallback, useEffect } from 'react'
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse, reset } from '../../../redux/courseSlice';
import { toast } from 'react-toastify'
import './CourseModal.css'

function DeleteCourse( {isOpen, setIsOpen, course, setCourse} ) {
    const dispatch = useDispatch()
    const { message } = useSelector(
        (state) => state.course
    )
    const isSuccess = useSelector(
        (state) => state.course.isSuccess[2]
    )
    const isError = useSelector(
        (state) => state.course.isError[2]
    )
    const isLoading = useSelector(
        (state) => state.course.isLoading[2]
    )
    const handleClose = useCallback(() => {
        setIsOpen(false)
        setCourse({})
    }, [setIsOpen, setCourse])

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

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteCourse(course._id))
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
            <h2 className="delete-label">Are you sure to delete this lecture?</h2>
            <div className="btn-list">
                <button className="btn-primary" onClick={handleDelete} disabled={isLoading || isError}>Submit</button>
                <button className="btn-secondary" onClick={handleClose}>Cancel</button>
            </div>
            </div>
        </Modal>
        </div>
    )
}
Modal.setAppElement("#root");
export default DeleteCourse