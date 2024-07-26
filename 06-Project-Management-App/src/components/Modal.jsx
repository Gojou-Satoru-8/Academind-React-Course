import { forwardRef, useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = forwardRef(function ({ children, buttonLabel }, ref) {
  const dialogElement = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialogElement.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialogElement} className="backdrop:bg-stone-900/70 p-4 rounded-md shadow-md">
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button type="submit">{buttonLabel}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
