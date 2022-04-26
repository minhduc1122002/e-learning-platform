import React, { useState } from "react";
import "./EditLecture.css";
import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux"
import {updateLecture} from "../../../redux/lectureSlice"
Modal.setAppElement("#root");

function EditLecture( {lecture} ) { 
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState({})

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const dispatch = useDispatch()
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleEditLecture = (e) => {
    e.preventDefault()
    dispatch(updateLecture({...inputs, _id: lecture._id}))
    toggleModal()
  }
  return (
    <div className="edit">
      <button onClick={toggleModal} className="fa-edit-lecture"><FontAwesomeIcon icon={faEdit}/></button>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
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
                // defaultValue={lecture.title}
                onChange={handleChange}
              />
            </div>

            <div className="edit-form-inputs">
              <label htmlFor="path" className="label-edit">
                <strong>PATH</strong>
              </label>
              <input
                type="text"
                name="path"
                className="input-edit"
                // defaultValue={lecture.course_path}
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
                  // defaultValue={lecture.description}
                  onChange={handleChange}
              />
            </div>

            <div className="btn-list">
                <button class="btn-primary" onClick={handleEditLecture}>Submit</button>
                <button class="btn-secondary" onClick={toggleModal}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default EditLecture;