import { useState } from '../../../reactor';
import { Link } from '../../../shared/routing/link';
import { ChatItem } from './chatitem';

const ChatList = () => {
    const [search, setSearch] = useState('');

    const chats = [
        {
            id: 1,
            name: 'Иван',
            lastMessage: 'Привет',
            lastMessageTime: '12:00',
            unreadMessages: 2,
            image: 'https://source.unsplash.com/random/150x150/?woman',
        },
        {
            id: 2,
            name: 'Мария',
            lastMessage: 'Привет',
            lastMessageTime: '12:00',
            unreadMessages: 1,
            image: 'https://source.unsplash.com/random/150x150/?woman',
        },
        {
            id: 3,
            name: 'Алексей',
            lastMessage: 'Привет',
            lastMessageTime: '12:00',
            unreadMessages: 0,
            image: 'https://source.unsplash.com/random/150x150/?woman',
        },
        {
            id: 4,
            name: 'Анна',
            lastMessage: 'Привет',
            lastMessageTime: '12:00',
            unreadMessages: 0,
            image: 'https://source.unsplash.com/random/150x150/?woman',
        },
        {
            id: 5,
            name: 'Ольга',
            lastMessage: 'Привет',
            lastMessageTime: '12:00',
            unreadMessages: 0,
            image: 'https://source.unsplash.com/random/150x150/?woman',
        },
    ];
    const [activeChat, setActiveChat] = useState(null);

    return (
        <div className="navbar">
            <div className="navbar__header">
                <Link to="/chats">
                    <div className="navbar__header__person">
                        <p className="navbar__header__person__name">Иван</p>
                        <img
                            src="https://source.unsplash.com/random/150x150/?man"
                            alt="Profile Picture"
                            className="navbar__header__person__image"
                        />
                    </div>
                </Link>
            </div>
            <div className="navbar__menu">
                <div className="navbar__menu__search">
                    <svg
                        version="1.1"
                        width="18px"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        enable-background="new 0 0 512 512"
                    >
                        <g>
                            <g>
                                <path
                                    d="m304.7,10.9c-108.5,0-196.4,87.9-196.4,196.4 0,46.9 16.4,89.9 43.8,123.7l-135,135c-8,8-8,20.9 0,28.9 8,8 20.9,8 28.9,0l135-135c33.8,27.4 76.8,43.8 123.7,43.8 108.5,0 196.4-87.9 196.4-196.4s-88-196.4-196.4-196.4zm0,352c-85.9,0-155.6-69.7-155.6-155.6 0-85.9 69.7-155.6 155.6-155.6 85.9,0 155.6,69.7 155.6,155.6 5.68434e-14,85.9-69.7,155.6-155.6,155.6z"
                                    fill="#000000"
                                    style="fill: rgb(220, 220, 220);"
                                ></path>
                            </g>
                        </g>
                    </svg>
                    <input
                        type="text"
                        placeholder="Поиск"
                        className="navbar__menu__search__input"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </div>
                <div className="navbar__menu__items">
                    {/* <ChatItem chat={chats[0]} /> */}
                    {/* {chats.map((chat) => (
                        <ChatItem chat={chat} />
                    ))} */}
                    {chats
                        .filter((chat) => {
                            return chat.name
                                .toLowerCase()
                                .includes(search.toLowerCase());
                        })
                        .map((chat) => (
                            <ChatItem
                                chat={chat}
                                activeChat={activeChat}
                                setActiveChat={setActiveChat}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
