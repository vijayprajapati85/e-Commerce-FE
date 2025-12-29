import '../admin/Model.css';

const Modal = ({isOpen, onClose, children}) => {

    if(!isOpen) return null;

    const handleOverlayClick = (e) =>{
        if(e.target.className === 'modal-overlay'){
            onClose();
        }
    };

    return(

        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default Modal;
