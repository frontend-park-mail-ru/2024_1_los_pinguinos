import { useState } from '../../../reactor';
import { store } from '../../../app/app';
import { navigateTo } from '../../../app/Router';

export const ChatItem = ({ chat, activeChat, setActiveChat }) => {
    console.log(chat);

    const [error, setError] = useState(false);

    return (
        <div>
            <div
                className={`navbar__menu__item ${
                    activeChat === chat.lastMessage.id
                        ? 'navbar__menu__item--active'
                        : ''
                }`}
                onClick={() => {
                    console.log('sender', chat.lastMessage.sender);
                    console.log('receiver', chat.lastMessage.receiver);
                    console.log('id', store.getState().id);
                    setActiveChat(chat.lastMessage.id);
                    store.dispatch({ type: 'UPDATE_CURRENT_CHAT', payload: chat.lastMessage.sender == 1 ? chat.lastMessage.receiver : chat.lastMessage.sender});
                    navigateTo('/chats');
                }}
            >
                <img
                    onError={() => setError(true)}
                    src={error ? "" : chat.photo}
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
