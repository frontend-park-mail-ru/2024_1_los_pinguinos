import { Modal } from '../../../shared/ui';
type Complaint = {
    callback: (event: any) => void;
    active: boolean;
    setActive: (event: any) => void;
};
const ComplaintPopup = ({ callback, active, setActive }: Complaint) => {
    return (
        <Modal active={active} setActive={setActive}>
            <div className="dialog">test</div>
            <button onClick={setActive(false)}>close</button>
        </Modal>
    );
};

export default ComplaintPopup;
