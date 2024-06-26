import { useState } from '../../reactor/index';
import {
    ProfilePhotoWidget,
    ProfileInterests,
    ProfileDescription,
    NameEdit,
    PasswordEdit,
    MailEdit,
    ProfileNavbar,
    ProfileDelete,
} from '../../widgets/index';
import { clsx } from '../../shared/lib/clsx/index';
import './index.css';


/**
 * A Profile page component that renders the profile and settings sections.
 *
 * @function Profile
 * @returns {JSX.Element} The rendered Profile component.
 */
export const Profile = () => {
    const [profileState, setState] = useState(0);
    const [title, setTitle] = useState('Профиль');
    return (
        <div className="profile__wrapper">
            <div className="profile__content-wrapper">
                <div
                    className={clsx(
                        'profile__block-group',
                        profileState !== 0 && 'any--none',
                    )}
                >
                    <h1 className="profile__text profile__text--title profile__title">
                        Профиль
                    </h1>
                    {ProfilePhotoWidget()}
                    {ProfileInterests()}
                    {ProfileDescription()}
                </div>
                <div
                    className={clsx(
                        'profile__block-group',
                        profileState !== 1 && 'any--none',
                    )}
                >
                    <h1 className="profile__text profile__text--title profile__title">
                        Настройки
                    </h1>
                    <div className="profile__content-block">
                        <span class="profile__label-text">
                            Информация об аккаунте
                        </span>
                        <div className="security__content-field">
                            {NameEdit()}
                            {MailEdit()}
                            {PasswordEdit()}
                        </div>
                    </div>
                    {ProfileDelete()}
                </div>
            </div>
            {ProfileNavbar({
                state: profileState,
                title: title,
                setState: setState,
                setTitle: setTitle,
            })}
        </div>
    );
};
