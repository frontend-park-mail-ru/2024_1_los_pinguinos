import { useEffect, useState } from '../../../reactor';
import { Link } from '../../../shared/routing/link';
import { ChatItem } from './chatitem';
import { getChats } from '../../../features/chat/api';
import { store } from '../../../app/app';

const ChatList = () => {
    const [search, setSearch] = useState('');
    const [chats, setChats] = useState([]);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const user = store.getState();

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
    }, [currentChat]);

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();
            console.log(state);
        });
    }, []);

    console.log('user', user);

    useEffect(() => {
        const socket = new WebSocket(
            'wss://api.jimder.ru/api/v1/openConnection?uid=1',
        );

        socket.onopen = () => {
            console.log('Connected');
            setWs(socket);
        };

        socket.onclose = () => {
            console.log('Disconnected');
        };

        return () => {
            socket.close();
        };
    }, []);

    // useEffect(() => {
    //     if (ws) {
    //         ws.onmessage = (e) => {
    //             console.log(e.data);
    //             const newMessage = JSON.parse(e.data);
                
    //         };
    //     }
    // }, [ws]);
        

    useEffect(() => {
        getChats()
            .then((data) => {
                console.log(data);
                setChats(data.chats);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [activeChat, setActiveChat] = useState(null);

    return (
        <div 
        style={{
            display: currentChat ? 'none' : width > 896 ? 'none' : 'block',
        }}

        className="chatlist">
            <div className="chatlist__header">
                <Link to="/chats">
                    <div className="chatlist__header__person">
                        <p className="chatlist__header__person__name">{user.name}</p>
                        <img
                            src={user.photos[0] ? user.photos[0].url : 'https://via.placeholder.com/150'}
                            alt="Profile Picture"
                            className="chatlist__header__person__image"
                        />
                    </div>
                </Link>
            </div>
            <div className="chatlist__menu">
                <div className="chatlist__menu__search">
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
                        className="chatlist__menu__search__input"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </div>
                <div className="chatlist__menu__items">
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
