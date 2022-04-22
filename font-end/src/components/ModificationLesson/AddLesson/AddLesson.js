import React, { useState } from 'react';
import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import './AddLesson.css';

Modal.setAppElement("#root");

function AddLesson() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("")
    function toggleModal() {
      setIsOpen(!isOpen);
    }
  
    return (
      <div className="add">
        <button className="fa-add-lesson" onClick={toggleModal}><FontAwesomeIcon icon={faAdd}/></button>
  
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
                  <h1>Add Lesson</h1>
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
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
  
                <div className="add-form-inputs">
                  <label htmlFor="id" className="label-add">
                    <strong>ID</strong>
                  </label>
                  <input
                    id="id"
                    type="text"
                    name="id"
                    className="input-add"
                    placeholder="ID"
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
  
                <div className="add-form-inputs">
                  <label htmlFor="description" className="label-add">
                    <strong>ARTICLES</strong>
                  </label>
                  <textarea
                    id="description"
                    type="description"
                    name="description"
                    style={{height: "120px", width: "100%", resize: "vertical"}}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>

                <div className="add-form-inputs">
                <label htmlFor="path" className="label-add">
                  <strong>VIDEO</strong>
                </label>
                <input
                  id="video"
                  type="text"
                  name="path"
                  className="input-add"
                  placeholder="Video"
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
  
                <div className="btn-list">
                  <button class="btn-primary" onClick={toggleModal}>Submit</button>
                  <button class="btn-secondary" onClick={toggleModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    );
}

export default AddLesson;