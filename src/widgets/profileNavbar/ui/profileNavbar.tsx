import { useState } from '../../../reactor/index';
import { Button } from '../../../shared/ui/index';
import { ConfirmationPopup } from '../../index';
import { store } from '../../../app/app';
import { redirectTo } from '../../../app/router';
import { logout } from '../../../entities/session/api/index';
import { clsx } from '../../../clsx/index';

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
                <div
                    className={clsx('nav__item', state === 0 && 'is-active')}
                    onClick={() => {
                        setState(0);
                        setTitle('Профиль');
                    }}
                >
                    <span
                        style="font-size: x-large"
                        className="icon-person-gear"
                    ></span>
                    <span className="nav__text nav__text--side">Профиль</span>
                </div>
                <div
                    className={clsx('nav__item', state === 1 && 'is-active')}
                    onClick={() => {
                        setState(1);
                        setTitle('Безопасность');
                    }}
                >
                    <span
                        style="font-size: x-large"
                        className="icon-person-lock"
                    ></span>
                    <span className="nav__text nav__text--side">
                        Безопасность
                    </span>
                </div>
                <div
                    className={clsx(
                        'nav__item',
                        'nav__item--critical',
                        active && 'is-active',
                    )}
                    onClick={() => setActive(true)}
                >
                    <span
                        style="font-size: x-large"
                        className="icon-box-arrow-right"
                    ></span>
                    <span className="nav__text nav__text--side">Выход</span>
                </div>
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
