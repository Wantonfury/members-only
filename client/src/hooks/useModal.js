import { useState, useEffect } from "react";

const checkModal = (modal) => {
  if (modal === <></> || modal === null || modal === undefined) return false;
  return true;
}

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