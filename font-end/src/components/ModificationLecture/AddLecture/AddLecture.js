import React, { useState } from "react";
import "./AddLecture.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import {addLecture} from '../../../redux/lectureSlice'
Modal.setAppElement("#root");

function AddLecture() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState({})
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleAddLecture = (e) => {
    e.preventDefault()
    dispatch(addLecture(inputs))
    toggleModal()
  }
  return (
    <div className="add">
      <button class="btn-enhanced" onClick={toggleModal}>
        Add A Lecture
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
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
                  <strong>TITLE</strong>
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
                <label htmlFor="path" className="label-add">
                  <strong>COURSE PATH</strong>
                </label>
                <input
                  id="course_path"
                  type="text"
                  name="course_path"
                  className="input-add"
                  placeholder="course path"
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
                <button class="btn-primary" onClick={handleAddLecture}>Submit</button>
                <button class="btn-secondary" onClick={toggleModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddLecture;