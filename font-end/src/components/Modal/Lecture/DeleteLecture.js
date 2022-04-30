import React, { useCallback, useEffect } from 'react'
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { deleteLecture, reset } from '../../../redux/lectureSlice';
import { toast } from 'react-toastify'

function DeleteLecture( {isOpen, setIsOpen, lecture, setLecture} ) {
    const dispatch = useDispatch()
    const { message } = useSelector(
        (state) => state.lecture
    )
    const isSuccess = useSelector(
        (state) => state.lecture.isSuccess[3]
    )
    const isError = useSelector(
        (state) => state.lecture.isError[3]
    )
    const isLoading = useSelector(
        (state) => state.lecture.isLoading[3]
    )

    const handleClose = useCallback(() => {
        setIsOpen(false)
        setLecture({})
    }, [setIsOpen, setLecture])

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

    const handleDeleteLecture = (e) => {
        e.preventDefault()
        dispatch(deleteLecture(lecture._id))
    }
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={handleClose}
                contentLabel="deletemodal"
                className="modal-container"
                overlayClassName="c-modal"
            >
            <div className="modal-content">
            <h2 className="delete-label">Are you sure to delete this lecture?</h2>
            <div className="btn-list">
                <button className="btn-primary" onClick={handleDeleteLecture} type="button" disabled={isLoading || isError}>Submit</button>
                <button className="btn-secondary" onClick={handleClose} type="button">Cancel</button>
            </div>
            </div>
        </Modal>
        </div>
    )
}
Modal.setAppElement("#root");
export default DeleteLecture