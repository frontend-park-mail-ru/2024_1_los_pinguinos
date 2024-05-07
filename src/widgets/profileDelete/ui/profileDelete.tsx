import { deleteProfile } from '../../../entities/session/api/index';
import { useState } from '../../../reactor/index';
import { Button } from '../../../shared/ui/index';
import { ConfirmationPopup } from '../../index';
import { store } from '../../../app/app';
import { redirectTo } from '../../../app/Router';

const ProfileDelete = () => {
    const [active, setActive] = useState(false);
    const [popupError, setPopupError] = useState('');
    async function handleDelete() {
        try {
            setPopupError('');
            const response = await deleteProfile();
            setActive(false);
            store.dispatch({ type: 'LOGOUT', payload: {} });
            store.dispatch({ type: 'UPDATE_AUTH', payload: false });
            redirectTo('/');
        } catch {
            setPopupError('Что-то пошло не так');
        }
    }
    return (
        <div>
            <Button
                label="Удалить аккаунт"
                size="l"
                fontSize="l1"
                severity="critical"
                onClick={() => {
                    setActive(true);
                }}
            />
            {ConfirmationPopup({
                active: active,
                setActive: setActive,
                popupError: popupError,
                popupTitle: 'Удалить аккаунт?',
                callback: handleDelete,
            })}
        </div>
    );
};

export default ProfileDelete;
