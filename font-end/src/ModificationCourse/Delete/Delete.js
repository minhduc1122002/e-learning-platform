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

      <Modal className="modal-edit"
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="editmodal"
      >
        <h2 className="delete-label">Are you sure to delete this lecture?</h2>
        <div className="btn-delete">
            <button className="confirm-delete">Delete</button>
            <button className="confirm-cancel" onClick={toggleModal}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default Delete;