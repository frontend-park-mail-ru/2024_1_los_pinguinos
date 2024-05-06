import { useState } from '../../../reactor';
import { store } from '../../../app/app';
import { navigateTo } from '../../../app/Router';

export const NavItem = ({ chat, activeChat, setActiveChat }) => {

    const [error, setError] = useState(false);

    return (
        <div>
            <div
                className={`navbar__menu__item ${
                    activeChat === chat.personID
                        ? 'navbar__menu__item--active'
                        : ''
                }`}
                onClick={() => {
                    setActiveChat(chat.personID);
                    store.dispatch({ type: 'UPDATE_CURRENT_CHAT', payload: chat.personID});
                    navigateTo('/chats');
                }}
            >
                <img
                    onError={() => setError(true)}
                    src={chat.photo &&  chat.photo != ''  ? chat.photo :  'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp'}
                    className="navbar__item__icon"
                    alt="Profile Picture"
                />
                <div className="navbar__item__info">
                    <p className="navbar__item__info__name">{chat.name}</p>
                    <p className="navbar__item__info__message">
                        {chat.lastMessage.data}
                    </p>
                </div>
            </div>
            <hr className="navbar__menu__divider" />
        </div>
    );
};
