import React, { useState } from "react";
import "./Add.css";

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
      <button class="btn-add" onClick={toggleModal}>
        <img width="120px" height="120px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1200px-OOjs_UI_icon_add.svg.png" />
      </button>

      <Modal className="modal"
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="addmodal"
      >
        <div className="add-field">
          <form className="add-form">
            <div className="header-add">
              <h1>Add courses</h1>
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
              <input
                id="description"
                type="description"
                name="description"
                className="input-add"
                placeholder="Description"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="add-form-inputs">
              <label htmlFor="code" className="label-add">
                <strong>CODE</strong>
              </label>
              <input
                id="code"
                type="code"
                name="code"
                className="input-add"
                placeholder="Code"
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
            <div className="add-input-btn">
              <button class="btn-submit" onClick={toggleModal}>Submit</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}