import { Modal, Button, InputCheckbox } from '../../../shared/ui';
import { clsx } from '../../../shared/lib/clsx';
import { useState } from '../../../reactor';
import { getComplaintTypes } from '../../../features/complain/api';
type Complaint = {
    callback: (event: any) => void;
    active: boolean;
    setActive: (event: any) => void;
    popupError?: string;
    complete: boolean;
};

/**
 * A ComplaintPopup component that renders a modal for submitting complaints.
 *
 * @function ComplaintPopup
 * @param {Complaint} props - The properties of the complaint popup component.
 * @returns {JSX.Element} The rendered complaint popup component.
 */
const ComplaintPopup = ({
    callback,
    active,
    setActive,
    popupError,
    complete,
}: Complaint) => {
    const [currentComplaint, setCurrentComplaint] = useState(null);
    const [complaintTypes, setComplaintTypes] = useState<any>([]);

    /**
     * Fetches the complaint types and updates the state.
     *
     * @function getTypes
     */
    const getTypes = async () => {
        try {
            const response: any = await getComplaintTypes();
            setComplaintTypes(response);
        } catch {
            setComplaintTypes([]);
        }
    };
    if (!complaintTypes.length) getTypes();

    return (
        <Modal active={active} setActive={setActive}>
            <form
                className={clsx('dialog', complete && 'any--none')}
                onSubmit={(event: any) => {
                    event.preventDefault();
                }}
            >
                <span className="dialog__title">Пожаловаться</span>
                <span className="dialog__info">Выберите причину жалобы</span>
                <div className="dialog__list-wrap list-wrap--column">
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
            <span className={clsx('dialog__title', !complete && 'any--none')}>
                Жалоба отправлена!
            </span>
        </Modal>
    );
};

export default ComplaintPopup;
