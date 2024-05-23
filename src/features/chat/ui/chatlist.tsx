import { useEffect, useState } from '../../../reactor';
import { ChatItem } from './chatitem';
import { getChats } from '../api';
import { store } from '../../../app/app';
import withWebSocket from '../../../app/socket';

/**
 * Компонент списка чатов
 * @param { WebSocket } socket - Сокет
 * @returns { JSX.Element } - Возвращает JSX-разметку списка чатов
 */
const ChatList = ({ socket }) => {
    const [chats, setChats] = useState([]);
    const defaultPhoto = 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp';
    const user = store.getState();

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();
        });
    }, []);

    const [currentChat, setCurrentChat] = useState(
        store.getState().currentChat,
    );

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();
            setCurrentChat(state.currentChat);
        });
    }, []);

    useEffect(() => {
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

                setChats(chats);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }, []);

    useEffect(() => {
        if (socket) {
            socket.addEventListener('message', handleMessage);
        }
        return () => {
            if (socket) {
                socket.removeEventListener('message', handleMessage);
            }
        };
    }, [socket]);

    /**
     * Обработчик нового сообщения
     * @param { Event } event - Событие
     * @returns { void }
     */
    const handleMessage = (event) => {
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
                        isNewMessage:
                            newMessage.receiver === user.id ? true : false,
                    };
                }
                return chat;
            });
            return newChats;
        });
    };

    const [activeChat, setActiveChat] = useState(null);

    return (
        // <div className="navbar__menu">
            <div
                style={{
                    display: chats.length == 0 ? 'none' : 'flex',
                }}
                className="navbar__menu__items"
            >
                {chats
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
                        <ChatItem
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
        // </div>
    );
};

export default withWebSocket(
    ChatList,
    'wss://api.jimder.ru/api/v1/openConnection',
);
