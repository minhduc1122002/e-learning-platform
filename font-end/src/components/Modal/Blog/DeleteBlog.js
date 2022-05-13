import React, { useCallback, useEffect } from 'react'
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, reset } from '../../../redux/blogSlice';
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

function DeleteBlog( {isOpen, setIsOpen, blog, setBlog} ) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { message } = useSelector(
        (state) => state.blog
    )
    const isSuccess = useSelector(
        (state) => state.blog.isSuccess[5]
    )
    const isError = useSelector(
        (state) => state.blog.isError[5]
    )
    const isLoading = useSelector(
        (state) => state.blog.isLoading[5]
    )
    const handleClose = useCallback(() => {
        setIsOpen(false)
        setBlog({})
    }, [setIsOpen, setBlog])

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
            navigate("/")
            handleClose()
            toast.success(message, {
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
        toast.clearWaitingQueue();
    }, [isError, message, dispatch, isSuccess, handleClose])

    const handleDeleteBlog = (e) => {
        e.preventDefault()
        dispatch(deleteBlog(blog))
    }
    return (
        <div>
            <ToastContainer limit={1}/>
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
                    <button className="btn-primary" onClick={handleDeleteBlog} disabled={isLoading || isError}>Submit</button>
                    <button className="btn-secondary" onClick={handleClose}>Cancel</button>
                </div>
                </div>
            </Modal>
        </div>
    )
}

export default DeleteBlog