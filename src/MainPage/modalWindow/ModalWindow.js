import { useEffect } from 'react';
import './ModalWindow.css';

export const ModalWindow = ({ visible, title, footer, content, onClose }) => {
  const onKeydown = ({ key }) => {
    if (key === 'Escape') {
      return onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, []);

  if (!visible) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">
            {content}
          </div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
