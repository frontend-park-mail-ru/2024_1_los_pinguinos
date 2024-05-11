import { Modal, Button } from '../../../shared/ui/index';
import { clsx } from '../../../clsx/index';

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
            <div className="dialog">
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
            </div>
        </Modal>
    );
};

export default ConfirmationPopup;
