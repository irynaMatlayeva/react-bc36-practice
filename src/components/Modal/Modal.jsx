import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  console.log('object');
  return createPortal(
    <div className={css.Modal__backdrop} onClick={handleBackdropClick}>
      <div className={css.Modal__content}>{children}</div>
    </div>,
    modalRoot
  );
}
