import Header from '../../widgets/header/ui/index';
import { Button } from '../../shared/ui/index';
import { useState } from '../../reactor/index';
import {
    ProfilePhotoWidget,
    ProfileInterests,
    ProfileDescription,
    NameEdit,
    PasswordEdit,
    MailEdit,
} from '../../widgets/index';
import { ProfileNavbar } from './profileNavbar';
import { clsx } from '../../clsx/index';
export const Profile = () => {
    const [state, setState] = useState(0);
    return (
        <div>
            <Header />
            <div className="wrapper">
                <div className="profile__wrapper">
                    <div className="profile__content-wrapper">
                        <div
                            className={clsx(
                                'profile__block-group',
                                state !== 0 && 'any--none',
                            )}
                        >
                            <h1 className="profile__text profile__text--title">
                                Профиль
                            </h1>
                            <ProfilePhotoWidget />
                            <ProfileInterests />
                            <ProfileDescription />
                        </div>
                        <div
                            className={clsx(
                                'profile__block-group',
                                state !== 1 && 'any--none',
                            )}
                        >
                            <h1 className="profile__text profile__text--title">
                                Настройки
                            </h1>
                            <div className="profile__content-block">
                                <span class="profile__label--text">
                                    Информация об аккаунте
                                </span>
                                <div className="security__content-field">
                                    <NameEdit />
                                    <MailEdit />
                                    <PasswordEdit />
                                </div>
                            </div>
                            <Button
                                label="Удалить аккаунт"
                                size="l"
                                fontSize="l1"
                                severity="contrast"
                            />
                        </div>
                    </div>
                    <ProfileNavbar state={state} setState={setState} />
                </div>
            </div>
        </div>
    );
};
