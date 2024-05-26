import { deleteProfile } from '../../../entities/session/api/index';
import { useState } from '../../../reactor/index';
import { Button } from '../../../shared/ui/index';
import { ConfirmationPopup } from '../../index';
import { store } from '../../../app/app';
import { redirectTo } from '../../../app/router';

/**
 * A ProfileDelete component that renders a button to delete the user's profile.
 *
 * @function ProfileDelete
 * @returns {JSX.Element} The rendered profile delete component.
 */
const ProfileDelete = () => {
    const [active, setActive] = useState(false);
    const [popupError, setPopupError] = useState('');

    /**
     * Handles the profile deletion process.
     *
     * @function handleDelete
     */
    async function handleDelete() {
        try {
            setPopupError('');
            const response = await deleteProfile();
            store.dispatch({ type: 'LOGOUT', payload: {} });
            store.dispatch({ type: 'UPDATE_AUTH', payload: false });
            setActive(false);
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
