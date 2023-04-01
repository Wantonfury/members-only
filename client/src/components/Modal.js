import { useContext } from "react";
import ReactDom from "react-dom";
import { ModalContext } from "../contexts/ModalContext";
import "../styles/Modal.css";
import BtnClose from "./BtnClose";

const Modal = () => {
  let { modalContent, handleModal, modal } = useContext(ModalContext);
  
  const closeModal = (e) => {
    const modalContainer = document.querySelector('#modal-root .modal-container');
    const btnClose = document.querySelector('#modal-root .modal-container .btn-close');
    
    if (e.target === modalContainer || e.target === btnClose) handleModal();
  }
  
  if (modal) {
    return ReactDom.createPortal(
      <div className="modal-container" onMouseDown={closeModal}>
        <div className="modal">
          <BtnClose onClick={() => handleModal()} />
          {modalContent}
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  }
  return null;
}

export default Modal;