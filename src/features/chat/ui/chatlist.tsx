import { useEffect, useState } from '../../../reactor';
import { ChatItem } from './chatitem';
import { getChats } from '../api';
import { store } from '../../../app/app';
import withWebSocket from '../../../app/socket';
import { Message } from '../../../app/socket';

/**
 * Компонент списка чатов
 * @param { WebSocket } socket - Сокет
 * @returns { JSX.Element } - Возвращает JSX-разметку списка чатов
 */
const ChatList = ({ socket, onMessage }) => {
    const [chats, setChats] = useState([]);
    const user = store.getState();

    // useEffect(() => {
    //     store.subscribe(() => {
    //         const state = store.getState();
    //     });
    // }, []);

    const [currentChat, setCurrentChat] = useState(
        store.getState().currentChat ? store.getState().currentChat.id : 0,
    );

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();
            setCurrentChat(state.currentChat ? state.currentChat.id : 0);
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
                            Properties: {
                                ...chat.lastMessage.Properties,
                                time: new Date(
                                    chat.lastMessage.Properties.time,
                                ).getTime(),
                            },
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

    // useEffect(() => {
    //     if (socket) {
    //         socket.addEventListener('message', handleMessage);
    //         console.log('socket in chatList', socket);
    //     }

    //     return () => {
    //         if (socket) {
    //             socket.removeEventListener('message', handleMessage);
    //         }
    //     };
    // }, [socket]);
    useEffect(() => {
        if (onMessage) {
            onMessage((message: Message) => {
                handleMessage(message);
            });
        }
    }, [onMessage]);

    /**
     * Обработчик нового сообщения
     * @param { Event } event - Событие
     * @returns { void }
     */
    const handleMessage = (newMessage: Message) => {
        // newMessageInChats(newMessage);
        setChats((prev) => {
            const newChats = prev.map((chat) => {
                if (
                    (`${newMessage.Properties.sender}` === `${user.id}` &&
                    newMessage.Properties.receiver === chat.personID) ||
                    (newMessage.Properties.sender === chat.personID &&
                    newMessage.Properties.receiver === `${user.id}`)
                ) {
                    return {
                        ...chat,
                        lastMessage: newMessage,
                        isNewMessage:
                            newMessage.Properties.receiver === `${user.id}`
                                ? true
                                : false,
                    };
                }
                return chat;
            });
            return newChats;
        });
    };

    const [activeChat, setActiveChat] = useState(
        store.getState().currentChat ? store.getState().currentChat.id : 0,
    );

    return (
        // <div className="navbar__menu">
        <div

            className="navbar__menu__items"
        >
            {chats.length != 0 &&
            chats
                .sort((a, b) => {
                    if (
                        a.lastMessage.Properties.time >
                        b.lastMessage.Properties.time
                    ) {
                        return -1;
                    }
                    if (
                        a.lastMessage.Properties.time <
                        b.lastMessage.Properties.time
                    ) {
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
                    textAlign: 'center',
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
