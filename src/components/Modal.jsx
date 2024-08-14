import React from "react";
import "../Modal.css";

const Modal = ({ show, onClose, content }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <p className="para">{content}</p>
      </div>
    </div>
  );
};

export default Modal;
