import Header from '../../widgets/header/ui';
import { useState } from '../../reactor/index';
import NameEdit from '../../widgets/nameEdit/index';
import MailEdit from '../../widgets/mailEdit/index';
import PasswordEdit from '../../widgets/passwordEdit';
import InterestsEdit from '../../widgets/interestsEdit';
import PhotoEdit from '../../widgets/photoEdit';
import DescriptionEdit from '../../widgets/decriptionEdit/ui';

export const ProfilePage = () => {

    const [isProfile, setIsProfile] = useState(true);
    const [isSecurity, setIsSecurity] = useState(false);

    return (
        <div>
            <Header />
            <div className="wrapper">
                <div style={{ display: 'flex' }} className="profile__content">
                    <div
                        style={{ display: isProfile ? 'block' : 'none' }}
                        className="profile"
                    >
                        <h1>Профиль</h1>
                        <div className="profile__photos">
                            <PhotoEdit />
                        </div>
                        <div className="profile__interests">
                            <InterestsEdit />
                        </div>
                        <div className="profile__description">
                            <DescriptionEdit />
                        </div>
                    </div>
                    <div
                        style={{ display: isSecurity ? 'block' : 'none' }}
                        className="security"
                    >
                        <h1 className="security__header">Безопасность</h1>
                        <div className="security__content">
                            <h1 className="security__content-header">
                                Инфомация об аккаунте
                            </h1>
                            <div className="security__content-field">
                                <NameEdit />
                            </div>

                            <div className="security__content-field">
                                <MailEdit />
                            </div>

                            <div className="security__content-field">
                                <PasswordEdit />
                            </div>
                        </div>

                        <button>Удалить аккаунт</button>
                    </div>

                    <div className="profile__tabs">
                        <button
                            onClick={() => {
                                setIsProfile(true);
                                setIsSecurity(false);
                            }}
                        >
                            Профиль
                        </button>
                        <button
                            onClick={() => {
                                setIsProfile(false);
                                setIsSecurity(true);
                            }}
                        >
                            Безопасность
                        </button>
                        <button>Выйти</button>
                    </div>
                </div>
            </div>
        </div>
    );
};