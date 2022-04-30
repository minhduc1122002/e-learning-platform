import React, { useState, useEffect, useCallback } from 'react'
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { updateLecture, reset } from '../../../redux/lectureSlice';
import { toast } from 'react-toastify'

function EditLecture( {isOpen, setIsOpen, lecture, setLecture} ) {
  const [inputs, setInputs] = useState({
    title: lecture.title,
    description: lecture.description
  })

  const { message } = useSelector(
    (state) => state.lecture
  )
  const isSuccess = useSelector(
      (state) => state.lecture.isSuccess[2]
  )
  const isError = useSelector(
      (state) => state.lecture.isError[2]
  )
  const isLoading = useSelector(
      (state) => state.lecture.isLoading[2]
  )

  const dispatch = useDispatch()
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClose = useCallback(() => {
    setIsOpen(false)
    setLecture({})
    setInputs({})
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

  const handleEditLecture = (e) => {
    e.preventDefault()
    dispatch(updateLecture({...inputs, _id: lecture._id}))
  }
  return (
    <>
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
              <h1>Edit Lecture</h1>
            </div>

            <div className="edit-form-inputs">
              <label htmlFor="title" className="label-edit">
                <strong>TITLE</strong>
              </label>
              <input
                type="title"
                name="title"
                className="input-edit"
                defaultValue={lecture.title}
                onChange={handleChange}
              />
            </div>

            <div className="edit-form-inputs">
              <label htmlFor="description" className="label-edit">
                <strong>DESCRIPTION</strong>
              </label>
              <textarea
                  id="description"
                  type="description"
                  name="description"
                  style={{height: "120px", width: "100%", resize: "vertical"}}
                  defaultValue={lecture.description}
                  onChange={handleChange}
              />
            </div>

            <div className="btn-list">
                <button className="btn-primary" onClick={handleEditLecture} type="button" disabled={isLoading || isError}>Submit</button>
                <button className="btn-secondary" onClick={handleClose} type="button">Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
Modal.setAppElement("#root");
export default EditLecture