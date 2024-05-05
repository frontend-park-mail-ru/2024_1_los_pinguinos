export const ChatItem = ({ chat, activeChat, setActiveChat }) => {
    console.log(chat);

    return (
        <div>
            <div
                className={`navbar__menu__item ${
                    activeChat === chat.id ? 'navbar__menu__item--active' : ''
                }`}
                onClick={() => {
                    console.log(chat.id);
                    setActiveChat(chat.id);
                }}
            >
                <img
                    src={chat.image}
                    className="navbar__item__icon"
                    alt="Profile Picture"
                />
                <div className="navbar__item__info">
                    <p className="navbar__item__info__name">{chat.name}</p>
                    <p className="navbar__item__info__message">
                        {chat.lastMessage}
                    </p>
                </div>
            </div>
            <hr className="navbar__menu__divider" />
        </div>
    );
};
