import { useEffect, useState } from '../../../reactor';
import { store } from '../../../app/app';
import withWebSocket from '../../../app/socket';
import ChatList from '../../../features/chat/ui/chatlist';
import './index.css';
import { clsx } from '../../../shared/lib/clsx';

/**
 * Компонент навбара для десктопной версии
 * @param { Function } closeSocket - Функция закрытия сокета
 * @returns { JSX.Element } - Возвращает JSX-разметку навбара
 */
const Navbar = ({ closeSocket, onMessage }) => {
    const defaultPhoto = 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp';
    const user = store.getState();
    const [userPhoto, setUserPhoto] = useState(
        user.photos && user.photos[0] && user.photos[0].url
            ? user.photos[0].url
            : defaultPhoto,
    );

    const [userName, setUserName] = useState(user.name);

    const [userPremium, setUserPremium] = useState(user.premium);

    useEffect(() => {
        const unsubscribePhoto = store.subscribe(
            (photos: any) => {
                setUserPhoto(
                    photos && photos[0] && photos[0].url
                        ? photos[0].url
                        : defaultPhoto,
                );
            },
            ['photos'],
        );
        const unsubscribeName = store.subscribe(
            (name: string) => {
                setUserName(name);
            },
            ['name'],
        );
        const unsubscribePremium = store.subscribe(
            (premium: boolean) => {
                setUserPremium(premium);
            },
            ['premium'],
        );

        return () => {
            unsubscribePhoto();
            unsubscribeName();
            unsubscribePremium();
        };
    }, []);

    useEffect(() => {
        return () => {
            closeSocket();
        };
    }, [closeSocket]);

    useEffect(() => {
        if (onMessage) {
            onMessage((message) => {
                console.log('New message in Navbar:', message);
                // обработка сообщений для Navbar
            });
        }
    }, [onMessage]);

    return (
        <div className="navbar">
            <div className="navbar__header">
                <div className="navbar__header__person">
                    <p className="navbar__header__person__name">{userName}</p>
                    <div
                        className={clsx(
                            userPremium && 'navbar__header--premium',
                        )}
                    >
                        <img
                            src={userPhoto}
                            alt="Profile Picture"
                            className="navbar__header__person__image"
                        />
                        <span
                            className={clsx(
                                'premium-icon icon-stars',
                                !userPremium && 'any--none',
                            )}
                        ></span>
                    </div>
                </div>
            </div>
            <div className="navbar__menu">{ChatList({})}</div>
        </div>
    );
};

export default withWebSocket(
    Navbar,
    'wss://api.jimder.ru/api/v1/openConnection',
);
