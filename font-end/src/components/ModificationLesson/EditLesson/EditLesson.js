import React, { useState } from "react";
import "./EditLesson.css";
import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux"
import {updateLessontoLecture} from "../../../redux/lectureSlice"
function EditLesson({lessons}) {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState({})
  
    const toggleModal = () => {
      setIsOpen(!isOpen);
    }

    const dispatch = useDispatch();

    const handleChange = (e) => {
      setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
      });
    };

    const handleUpdateLesson = (e) => {
      e.preventDefault()
      dispatch(updateLessontoLecture({...inputs, _id: lecture._id}))
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
                <h1>Edit Lesson</h1>
              </div>

              <div className="edit-form-inputs">
                <label htmlFor="title" className="label-edit">
                  <strong>TITLE</strong>
                </label>
                <input
                  type="title"
                  name="title"
                  className="input-edit"
                //   defaultValue={lesson.title}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
  
              <div className="edit-form-inputs">
                <label htmlFor="path" className="label-edit">
                  <strong>ID</strong>
                </label>
                <input
                  type="text"
                  className="input-edit"
                //   defaultValue={lesson.path}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
  
              <div className="edit-form-inputs">
                <label htmlFor="description" className="label-edit">
                  <strong>ARTICLES</strong>
                </label>
                <textarea
                    id="description"
                    type="description"
                    name="description"
                    style={{height: "120px", width: "100%", resize: "vertical"}}
                    // defaultValue={lesson.description}
                    onChange={(e) => setInput(e.target.value)}
                />
              </div>
  
              <div className="edit-form-inputs">
                <label htmlFor="image" className="label-edit">
                  <strong>VIDEO</strong>
                </label>
                <input
                  type="url"
                  name="video"
                  className="input-edit"
                //   defaultValue={lesson.image}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="btn-list">
                  <button class="btn-primary" onClick={toggleModal}>Submit</button>
                  <button class="btn-secondary" onClick={toggleModal}>Cancel</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
}

export default EditLesson