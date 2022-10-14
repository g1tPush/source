import ButtonWithProgress from "./ButtonWithProgress";

interface ModalProps {
  content?: string;
  confirmButton?: string;
  cancelButton?: string;
  onClickCancel: () => void;
  onClickConfirm: () => void;
  apiProgress: boolean;
}

const Modal = ({
  content,
  confirmButton = "Yes",
  cancelButton = "Cancel",
  onClickCancel = () => console.log("onClickCancel is not set"),
  onClickConfirm = () => console.log("onClickConfirm is not set"),
  apiProgress = false,
}: ModalProps) => {
  return (
    <div
      className="bg-black bg-opacity-50 d-block modal show"
      tabIndex={-1}
      data-testid="modal"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <p>{content}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClickCancel}
            >
              {cancelButton}
            </button>
            <ButtonWithProgress
              onClick={onClickConfirm}
              apiProgress={apiProgress}
            >
              {confirmButton}
            </ButtonWithProgress>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
