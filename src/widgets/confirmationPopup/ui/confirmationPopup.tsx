import { Modal, Button } from '../../../shared/ui/index';
import { clsx } from '../../../shared/lib/clsx/index';

export interface IConfirmationPopup {
    active: boolean;
    setActive: (event: any) => void;
    callback: (event: any) => void;
    popupTitle: string;
    popupError?: string;
    popupDescription?: string;
    cancelLabel?: string;
    acceptLabel?: string;
    forced?: boolean;
}

/**
 * A ConfirmationPopup component that renders a modal for confirming actions.
 *
 * @function ConfirmationPopup
 * @param {IConfirmationPopup} props - The properties of the confirmation popup component.
 * @returns {JSX.Element} The rendered confirmation popup component.
 */
const ConfirmationPopup = ({
    active,
    setActive,
    callback,
    popupTitle,
    popupError,
    popupDescription,
    cancelLabel = 'Отмена',
    acceptLabel = 'Продолжить',
    forced,
}: IConfirmationPopup) => {
    return (
        <Modal active={active} setActive={setActive} forced={forced}>
            <form
                className="dialog"
                onSubmit={(event: any) => {
                    event.preventDefault();
                }}
            >
                <span className="dialog__title">{popupTitle}</span>
                <span className="dialog__info">{popupDescription}</span>
                <div className="dialog__button-wrap">
                    <div className={forced ? 'any--none' : ''}>
                        <Button
                            label={cancelLabel}
                            size="m"
                            fontSize="m"
                            severity="success"
                            onClick={() => {
                                setActive(false);
                            }}
                        />
                    </div>
                    <Button
                        label={acceptLabel}
                        size={forced ? 'max-width' : 'm'}
                        fontSize="m"
                        severity={forced ? 'success' : 'danger'}
                        onClick={callback}
                    />
                </div>
                <span
                    className={clsx(
                        !popupError && 'any--none',
                        'dialog__error',
                    )}
                >
                    {popupError}
                </span>
            </form>
        </Modal>
    );
};

export default ConfirmationPopup;
