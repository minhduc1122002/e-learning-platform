import React, { useState } from "react";
import "./EditLecture.css";
import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

function EditLecture(  ) { //{lecture}
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("")

  const toggleModal = () => {
    setIsOpen(!isOpen);
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
                onChange={(e) => setInput(e.target.value)}
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
                onChange={(e) => setInput(e.target.value)}
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
                //   defaultValue={lecture.description}
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

export default EditLecture;