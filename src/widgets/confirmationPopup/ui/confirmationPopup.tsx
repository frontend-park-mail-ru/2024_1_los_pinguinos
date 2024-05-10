import { Modal, Button } from '../../../shared/ui/index';
import { clsx } from '../../../clsx/index';

export interface IConfirmationPopup {
    active: boolean;
    setActive: (event: any) => void;
    callback: (event: any) => void;
    popupTitle: string;
    popupError: string;
}

const ConfirmationPopup = ({
    active,
    setActive,
    callback,
    popupTitle,
    popupError,
}: IConfirmationPopup) => {
    return (
        <Modal active={active} setActive={setActive}>
            <div className="dialog">
                <span className="dialog__title">{popupTitle}</span>
                <div className="dialog__button-wrap">
                    <Button
                        label="Отмена"
                        size="m"
                        fontSize="m"
                        severity="success"
                        onClick={() => {
                            setActive(false);
                        }}
                    />
                    <Button
                        label="Продолжить"
                        size="m"
                        fontSize="m"
                        severity="danger"
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
