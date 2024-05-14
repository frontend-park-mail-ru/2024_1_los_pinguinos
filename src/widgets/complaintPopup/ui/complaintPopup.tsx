import { Modal, Button, InputCheckbox } from '../../../shared/ui';
import { clsx } from '../../../clsx';
import { useEffect, useState } from '../../../reactor';
type Complaint = {
    callback: (event: any) => void;
    active: boolean;
    setActive: (event: any) => void;
    popupError?: string;
    complaintTypes: any;
};
const ComplaintPopup = ({
    callback,
    active,
    setActive,
    popupError,
    complaintTypes,
}: Complaint) => {
    const [currentComplaint, setCurrentComplaint] = useState(null);
    return (
        <Modal active={active} setActive={setActive}>
            <form
                className="dialog"
                onSubmit={(event: any) => {
                    event.preventDefault();
                }}
            >
                <span className="dialog__title">Пожаловаться</span>
                <span className="dialog__info">Выберите причину жалобы</span>
                <div className="dialog__list-wrap">
                    {complaintTypes.map((complaint: any) => {
                        return (
                            <InputCheckbox
                                label={complaint.title}
                                checked={
                                    currentComplaint
                                        ? currentComplaint.title ===
                                          complaint.title
                                        : false
                                }
                                onChange={(event: any) => {
                                    setCurrentComplaint(
                                        event.target.checked ? complaint : null,
                                    );
                                }}
                            />
                        );
                    })}
                </div>
                <div className="dialog__button-wrap">
                    <Button
                        label="Отмена"
                        size="m"
                        fontSize="m"
                        severity="cancel"
                        onClick={() => {
                            setActive(false);
                            setCurrentComplaint(null);
                        }}
                    />
                    <Button
                        label="Пожаловаться"
                        size="m"
                        fontSize="m"
                        severity="success"
                        onClick={() => {
                            callback(
                                currentComplaint ? currentComplaint.id : null,
                            );
                            setCurrentComplaint(null);
                        }}
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

export default ComplaintPopup;
