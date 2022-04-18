import React, { useState } from "react";
import "./Edit.css";
import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

function Edit() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("")
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="edit">
      <button onClick={toggleModal} className="fa-edit"><FontAwesomeIcon icon={faEdit}/></button>

      <Modal className="modal-edit"
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="editmodal"
      >
        <div className="edit-field">
          <form className="edit-form">
            <div className="header-edit">
              <h1>Edit courses</h1>
            </div>

            <div className="edit-form-inputs">
              <label htmlFor="path" className="label-edit">
                <strong>PATH</strong>
              </label>
              <input
                type="text"
                name="path"
                className="input-edit"
                placeholder="Path"
                onChange={(e) => setInput(e.target.value)}
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
                placeholder="Title"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="edit-form-inputs">
              <label htmlFor="description" className="label-edit">
                <strong>DESCRIPTION</strong>
              </label>
              <input
                type="description"
                name="description"
                className="input-edit"
                placeholder="Description"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="edit-form-inputs">
              <label htmlFor="code" className="label-edit">
                <strong>CODE</strong>
              </label>
              <input
                type="code"
                name="code"
                className="input-edit"
                placeholder="Code"
                onChange={(e) => setInput(e.target.value)}
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
                placeholder="Image"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="edit-input-btn">
              <button class="btn-confirm">Confirm</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Edit;