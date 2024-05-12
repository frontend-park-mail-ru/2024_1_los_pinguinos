import { useEffect, useState } from '../../../reactor';
import { Link } from '../../../shared/routing/link';
import { NavItem } from './navitem';
import { getChats } from '../../../features/chat/api';
import { store } from '../../../app/app';
import withWebSocket from '../../../app/socket';

const Navbar = ({ socket }) => {
    const [search, setSearch] = useState('');
    const [chats, setChats] = useState([]);
    // const [ws, setWs] = useState<WebSocket | null>(null);
    const user = store.getState();

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();
            console.log(state);
        });
    }, []);

    const [currentChat, setCurrentChat] = useState(
        store.getState().currentChat,
    );

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();
            console.log(state);
            setCurrentChat(state.currentChat);
        });
    }, []);

    useEffect(() => {
        console.log('currentChat', currentChat);
        if (!currentChat) {
            return;
        }

        const newChats = chats.map((chat) => {
            if (chat.personID === currentChat) {
                return {
                    ...chat,
                    isNewMessage: false,
                };
            }
            return chat;
        });

        setChats(newChats);
    }, [currentChat]);

    useEffect(() => {
        getChats()
            .then((data) => {
                const chats = data.chats.map((chat) => {
                    return {
                        ...chat,
                        lastMessage: {
                            ...chat.lastMessage,
                            time: new Date(chat.lastMessage.time).getTime(),
                        },
                        isNewMessage: false,
                    };
                });
                console.log('chats', chats);
                setChats(chats);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        console.log(socket);
        if (socket) {
            socket.addEventListener('message', handleMessage);
        }
        return () => {
            if (socket) {
                socket.removeEventListener('message', handleMessage);
            }
        };
    }, [socket]);

    const handleMessage = (event) => {
        console.log('Received message in Navbar:', event.data);
        const newMessage = JSON.parse(event.data);
        // newMessageInChats(newMessage);
        setChats((prev) => {
            const newChats = prev.map((chat) => {
                if (
                    (newMessage.sender === user.id &&
                        newMessage.receiver === chat.personID) ||
                    (newMessage.sender === chat.personID &&
                        newMessage.receiver === user.id)
                ) {
                    return {
                        ...chat,
                        lastMessage: newMessage,
                        isNewMessage: true,
                    };
                }
                return chat;
            });
            console.log('newChats', newChats);
            return newChats;
        });
    };

    const [activeChat, setActiveChat] = useState(null);

    return (
        <div className="navbar">
            <div className="navbar__header">
                <Link to="/chats">
                    <div className="navbar__header__person">
                        <p className="navbar__header__person__name">
                            {user.name}
                        </p>
                        <img
                            src={
                                user.photos &&
                                user.photos[0] &&
                                user.photos[0].url != ''
                                    ? user.photos[0].url
                                    : 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp'
                            }
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
                <div
                    style={{
                        display: chats.length == 0 ? 'none' : 'flex',
                    }}
                    className="navbar__menu__items"
                >
                    {
                    chats
                        .filter((chat) => {
                            return chat.name
                                .toLowerCase()
                                .includes(search.toLowerCase());
                        })
                        .sort((a, b) => {

                            if (a.lastMessage.time > b.lastMessage.time) {
                                return -1;
                            }
                            if (a.lastMessage.time < b.lastMessage.time) {
                                return 1;
                            }
                            return 0;
                        })
                        .map((chat) => (
                            <NavItem
                                chat={chat}
                                activeChat={activeChat}
                                setActiveChat={setActiveChat}
                            />
                        ))}
                    <p
                        style={{
                            display: chats.length == 0 ? 'block' : 'none',
                            fontSize: '25px',
                            fontWeight: '800',
                            color: 'white',
                        }}
                    >
                        Нет чатов
                    </p>
                </div>
            </div>
        </div>
    );
};

export default withWebSocket(
    Navbar,
    'wss://api.jimder.ru/api/v1/openConnection',
);