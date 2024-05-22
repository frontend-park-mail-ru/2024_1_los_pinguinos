import { useState } from '../../../reactor';
import { store } from '../../../app/app';
import { navigateTo } from '../../../app/router';
import { timeAgo } from '../../../shared/lib';

/**
 * Компонент элемента чата
 * @param { Object } chat - Чат
 * @param { Object } activeChat - Активный чат
 * @param { Function } setActiveChat - Функция установки активного чата
 * @returns { JSX.Element } - Возвращает JSX-разметку элемента чата
 */
export const ChatItem = ({ chat, activeChat, setActiveChat }) => {
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
                    store.dispatch({
                        type: 'UPDATE_CURRENT_CHAT_NAME',
                        payload: chat.name,
                    });
                    store.dispatch({
                        type: 'UPDATE_CURRENT_CHAT_PHOTO',
                        payload: chat.photo,
                    });
                    navigateTo('/chats');
                }}
            >
                <div className="navbar__item__person">
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
                </div>
                <div className="navbar__item__status">
                    <div className="navbar__item__time">
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
            </div>
            <hr className="navbar__menu__divider" />
        </div>
    );
};
