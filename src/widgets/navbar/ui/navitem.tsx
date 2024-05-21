import { useState } from '../../../reactor';
import { store } from '../../../app/app';
import { navigateTo } from '../../../app/router';

function timeAgo(timestamp) {
    if (timestamp < 0) return '';
    const now = Math.floor(Date.now() / 1000); // текущая метка времени в секундах
    const secondsAgo = Math.floor((now - timestamp / 1000) / 60); // разница в минутах
    if (secondsAgo < 1) {
        return 'только что';
    }
    if (secondsAgo < 60) {
        return `${secondsAgo} минут назад`;
    } else if (secondsAgo < 1440) {
        // если меньше одного дня
        const hoursAgo = Math.floor(secondsAgo / 60);

        return `${hoursAgo} часов назад`;
    } else {
        // если больше одного дня
        const daysAgo = Math.floor(secondsAgo / 1440);

        return `${daysAgo} дней назад`;
    }
}

export const NavItem = ({ chat, activeChat, setActiveChat }) => {
    const [error, setError] = useState(false);

    return (
        <div>
            <div
                className={`navbar__menu__item ${
                    activeChat
                        ? activeChat.personID === chat.personID
                            ? 'navbar__menu__item--active'
                            : ''
                        : ''
                }`}
                onClick={() => {
                    setActiveChat({
                        ...chat,
                        isNewMessage: false,
                    });
                    store.dispatch({
                        type: 'UPDATE_CURRENT_CHAT',
                        payload: chat.personID,
                    });
                    navigateTo('/chats');
                }}
            >
                <img
                    onError={() => setError(true)}
                    src={
                        chat.photo && chat.photo != ''
                            ? chat.photo
                            : 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp'
                    }
                    className="navbar__item__icon"
                    alt="Profile Picture"
                />
                <div className="navbar__item__info">
                    <p className="navbar__item__info__name">{chat.name}</p>
                    <p className="navbar__item__info__message">
                        {chat.lastMessage.data}
                    </p>
                </div>
                <div className="navbar__item__info__time">
                    <p>{timeAgo(chat.lastMessage.time)}</p>
                </div>
                <div
                    style={{
                        display: activeChat
                            ? chat.isNewMessage &&
                              chat.personID !== activeChat.personID
                                ? 'block'
                                : 'none'
                            : 'none',
                    }}
                    className="navbar_item_notification"
                ></div>
            </div>
            <hr className="navbar__menu__divider" />
        </div>
    );
};