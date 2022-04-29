import React, { useEffect } from 'react'
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { deleteLecture, reset } from '../../../redux/lectureSlice';
import { toast } from 'react-toastify'

function DeleteLecture( {isOpen, setIsOpen, lecture, setLecture} ) {
    const dispatch = useDispatch()
    const { isLoading, isError, message, isSuccess } = useSelector(
        (state) => state.lecture
    )

    useEffect(() => {
        if (isError[3]) {
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
        if (isSuccess[3]) {
            dispatch(reset())
            handleClose()
        }
        toast.clearWaitingQueue();
    }, [isError, message, dispatch, isSuccess])

    const handleClose = () => {
        setIsOpen(false)
        setLecture({})
    }

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
                <button className="btn-primary" onClick={handleDeleteLecture} type="button" disabled={isLoading[3] || isError[3]}>Submit</button>
                <button className="btn-secondary" onClick={handleClose} type="button">Cancel</button>
            </div>
            </div>
        </Modal>
        </div>
    )
}
Modal.setAppElement("#root");
export default DeleteLecture