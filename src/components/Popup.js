import React, { useEffect, useRef } from "react";
function Popup({ children, name, isOpen, onClose }) {
  const closeButtonRef = useRef();

  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.code === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keyup", handleEscClose);

    return () => {
      document.removeEventListener("keyup", handleEscClose);
    };
  }, [isOpen, onClose]);

  const handleClose = (event) => {
    if (event.target === event.currentTarget || event.target === closeButtonRef.current) {
      onClose();
    }
  }

  return (
    <>
      <div className={`popup popup_type_${name}` + (isOpen ? " popup_opened" : "")}
           onClick={handleClose}
      >
        <div className={`popup__container popup__container_type_${name}`}>
          <button
            type="button"
            className="popup__close-button"
            ref={closeButtonRef}
          ></button>
          {children}
        </div>
      </div>
    </>
  );
}

export default Popup;
