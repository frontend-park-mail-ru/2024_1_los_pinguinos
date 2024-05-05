import { useState } from '../../../reactor';

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
                    setActiveChat(chat.lastMessage.id);
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
