import React, { useState } from "react";
import "./Add.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Add() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("")
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="add">
      <button class="btn-enhanced" onClick={toggleModal}>
        Add A Course
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
                <h1>Add Course</h1>
              </div>

              <div className="add-form-inputs">
                <label htmlFor="path" className="label-add">
                  <strong>PATH</strong>
                </label>
                <input
                  id="path"
                  type="text"
                  name="path"
                  className="input-add"
                  placeholder="Path"
                  onChange={(e) => setInput(e.target.value)}
                />
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
                <label htmlFor="description" className="label-add">
                  <strong>DESCRIPTION</strong>
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
                <label htmlFor="code" className="label-add">
                  <strong>CODE</strong>
                </label>
                <textarea
                  id="code"
                  type="code"
                  name="code"
                  style={{height: "120px", width:"100%", resize: "vertical"}}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              <div className="add-form-inputs">
                <label htmlFor="image" className="label-add">
                  <strong>IMAGE</strong>
                </label>
                <input
                  id="image"
                  type="link"
                  name="image"
                  className="input-add"
                  placeholder="Image"
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