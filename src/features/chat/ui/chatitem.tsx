import { useState } from '../../../reactor';
import { store } from '../../../app/app';
import { redirectTo } from '../../../app/router';
import { timeAgo } from '../../../shared/lib/date';
import { UserPhotoWidget } from '../../../widgets';

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
        <div className="navbar__menu__item__wrapper">
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
                        payload: {
                            id: chat.personID,
                            name: chat.name,
                            photo: chat.photo,
                        },
                    });
                    redirectTo('/chats');
                }}
            >
                <div className="navbar__item__person">
                    <UserPhotoWidget
                        url={
                            chat.photo
                                ? chat.photo
                                : 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp'
                        }
                        size="s"
                        premium={chat.premium}
                    />
                    <div className="navbar__item__info">
                        <p className="navbar__item__info__name">{chat.name}</p>
                        <p className="navbar__item__info__message">
                            {chat.lastMessage.Properties.data}
                        </p>
                    </div>
                </div>
                <div className="navbar__item__status">
                    <div className="navbar__item__time">
                        <p>{timeAgo(chat.lastMessage.Properties.time)}</p>
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
