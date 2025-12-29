export const DeleteConfirmation = ({ itemName, onConfirm, onCancel }) => {
    return (
        <div className="delete-confirmation">
            <p>Are you sure you want to delete <strong>{itemName}</strong>?</p>
            <div className="button-group">
                <button className="confirm-button" onClick={onConfirm}>Delete</button>
                <button className="cancel-button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
}