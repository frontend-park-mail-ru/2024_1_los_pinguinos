import { useState } from '../../../reactor/index';
import { Button } from '../../../shared/ui/index';
import { ConfirmationPopup } from '../../index';
import { store } from '../../../app/app';
import { redirectTo } from '../../../app/Router';
import { logout } from '../../../entities/session/api/index';

const ProfileNavbar = ({ state, setState, title, setTitle }: any) => {
    const [active, setActive] = useState(false);
    const [popupError, setPopupError] = useState('');
    async function handleLogout() {
        try {
            setPopupError('');
            const response = await logout();
            setActive(false);
            store.dispatch({ type: 'LOGOUT', payload: {} });
            store.dispatch({ type: 'UPDATE_AUTH', payload: false });
            redirectTo('/');
        } catch {
            setPopupError('Что-то пошло не так');
        }
    }
    return (
        <div className="profile__navbar-wrapper">
            <h1 className="profile__text profile__text--title navbar__text">
                {title}
            </h1>
            <div className="profile__navbar-content">
                <Button
                    label="Профиль"
                    icon="icon-person-gear"
                    severity={state === 0 ? 'success' : undefined}
                    fontSize="l1"
                    size="max-width"
                    navbar
                    onClick={() => {
                        setState(0);
                        setTitle('Профиль');
                    }}
                />
                <Button
                    label="Настройки"
                    icon="icon-person-lock"
                    severity={state === 1 ? 'success' : undefined}
                    fontSize="l1"
                    size="max-width"
                    navbar
                    onClick={() => {
                        setState(1);
                        setTitle('Безопасность');
                    }}
                />
                <Button
                    label="Выход"
                    icon="icon-box-arrow-right"
                    severity="critical"
                    fontSize="l1"
                    size="max-width"
                    navbar
                    onClick={() => {
                        setActive(true);
                    }}
                />
            </div>
            {ConfirmationPopup({
                active: active,
                setActive: setActive,
                popupError: popupError,
                popupTitle: 'Выйти?',
                callback: handleLogout,
            })}
        </div>
    );
};

export default ProfileNavbar;
