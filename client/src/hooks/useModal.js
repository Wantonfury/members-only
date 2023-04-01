import { useState } from "react";

const useModal = () => {
  const [modalContent, setModalContent] = useState(<></>);
  const [modal, setModal] = useState(false);
  
  const handleModal = (content = false) => {
    setModal(!modal);
    
    if (content) setModalContent(content);
  }
  
  return { modal, handleModal, modalContent };
}

export default useModal;