import Header from '../../widgets/header/ui/index';
import { Button, Modal } from '../../shared/ui/index';
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
    const [profileState, setState] = useState(0);
    const [title, setTitle] = useState('Профиль');
    const [active, setActive] = useState(false);
    const [callback, setCallback] = useState(() => {});
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
                    <Button
                        label="Удалить аккаунт"
                        size="l"
                        fontSize="l1"
                        severity="contrast"
                        onClick={() => {
                            setActive(true);
                            setCallback((callback) => {
                                return () => {
                                    console.log('hehe');
                                };
                            });
                        }}
                    />
                </div>
            </div>
            <ProfileNavbar
                state={profileState}
                title={title}
                setState={setState}
                setTitle={setTitle}
                setActive={setActive}
                setCallback={() => {
                    setCallback((callback) => {
                        return () => {
                            console.log('hihi');
                        };
                    });
                }}
            />
            <Modal active={active} setActive={setActive}>
                <div className="dialog">
                    <span className="dialog__title">Вы уверены?</span>
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
                </div>
            </Modal>
        </div>
    );
};
