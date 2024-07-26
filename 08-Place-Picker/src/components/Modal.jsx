import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = function Modal({ open, onCancel, children }) {
  const dialog = useRef();
  useEffect(() => {
    if (open) dialog.current.showModal();
    else dialog.current.close();
  }, [open]);
  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onCancel}>
      {open ? children : ""}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
