import React, { useState } from "react";
import "./Delete.css";
import Modal from "react-modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

function Delete() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="delete">
      <button onClick={toggleModal} id="delete" ><FontAwesomeIcon icon ={faTrash} className="delete-fa-icon"/></button>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="editmodal"
        className="modal-container"
        overlayClassName="c-modal"
      >
        <div className="modal-content">
          <h2 className="delete-label">Are you sure to delete this lecture?</h2>
          <div className="btn-list">
            <button class="btn-primary" onClick={toggleModal}>Submit</button>
            <button class="btn-secondary" onClick={toggleModal}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Delete;