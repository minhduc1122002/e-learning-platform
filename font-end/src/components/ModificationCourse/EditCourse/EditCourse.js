import React, { useState } from "react";
import "./EditCourse.css";
import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {updateCoursebyId} from "../../../redux/courseSlice.js";
import {useDispatch} from "react-redux"
Modal.setAppElement("#root");

function Edit( {course} ) {
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
  const handleEditCourse = (e) => {
    e.preventDefault()
    dispatch(updateCoursebyId({...inputs, _id: course._id}))
    toggleModal()
  }

  return (
    <div className="edit">
      <button onClick={toggleModal} className="fa-edit"><FontAwesomeIcon icon={faEdit}/></button>

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
              <h1>Edit Course</h1>
            </div>

            <div className="edit-form-inputs">
              <label htmlFor="path" className="label-edit">
                <strong>PATH</strong>
              </label>
              <input
                type="text"
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
                type="title"
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
                  type="description"
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
                  type="code"
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
                <button class="btn-primary" onClick={handleEditCourse}>Submit</button>
                <button class="btn-secondary" onClick={toggleModal}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Edit;