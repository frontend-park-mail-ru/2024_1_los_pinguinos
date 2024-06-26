import { useEffect, useState } from '../../../reactor';
import withWebSocket from '../../../app/socket';
import { getMessages } from '../../../features/chat/api';
import { store } from '../../../app/app';
import './index.css'

/**
 * Компонент сообщений чата
 * @param { WebSocket } socket - Сокет
 * @param { Function } setSocket - Функция установки сокета
 * @returns { JSX.Element } - Возвращает JSX-разметку сообщений чата
 */
const ChatMessages = ({ socket, setSocket }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const defaultPhoto = 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp';
    const [userID, setUserID] = useState(store.getState().id);
    const [currentChat, setCurrentChat] = useState(
        store.getState().currentChat ? store.getState().currentChat.id : 0,
    );
    const [currentChatName, setCurrentChatName] = useState(

        store.getState().currentChat ? store.getState().currentChat.name : '',
    );
    const [currentChatPhoto, setCurrentChatPhoto] = useState(
       store.getState().currentChat && store.getState().currentChat.photo != ''
            ? store.getState().currentChat.photo
            : defaultPhoto,
    );

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();

            setCurrentChat(state.currentChat.id);
            setCurrentChatName(state.currentChat.name);
            setCurrentChatPhoto(
                state.currentChat.photo == ''
                    ? defaultPhoto
                    : store.getState().currentChat.photo,
            );
        });
    }, []);

    useEffect(() => {
        if (!currentChat) {
            return;
        }
        getMessages(currentChat)
            .then((data) => {
                setMessages(data);
                setTimeout(() => {
                    const chat = document.querySelector('.chatMessages__list');
                    if (chat) {
                        chat.scrollTop = chat.scrollHeight;
                    }
                }, 100);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentChat]);

    useEffect(() => {
        if (socket) {
            socket.onmessage = (e) => {
                const newMessage = JSON.parse(e.data);
                if (
                    (newMessage.sender === userID &&
                        newMessage.receiver === store.getState().currentChat.id) ||
                    (newMessage.sender === store.getState().currentChat.id &&
                        newMessage.receiver === userID &&
                        newMessage.data != '')
                ) {
                    setMessages((prev) => {
                        return [newMessage, ...prev];
                    });
                }

                setTimeout(() => {
                    const chat = document.querySelector('.chatMessages__list');
                    if (chat) {
                        chat.scrollTop = chat.scrollHeight;
                    }
                }, 100);
            };

            socket.onclose = () => {
                const newSocket = new WebSocket(
                    'wss://api.jimder.ru/api/v1/openConnection',
                );
                setSocket(newSocket);
            };
        }

        return () => {
            if (socket) {
                socket.onmessage = null;
                socket.close();
            }
        };
    }, [socket, setSocket]);


    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = () => {
        if (socket && message != '') {
            socket.send(
                JSON.stringify({
                    data: message,
                    sender: store.getState().id,
                    receiver: currentChat,
                    time: new Date().getTime(),
                }),
            );
            setMessage('');
            const input = document.querySelector('.chatMessages__input__field');
            if (input) {
                input.value = '';
            }
        }
    };

    return (
        <div
            style={{ display: currentChat ? 'flex' : 'none' }}
            className="chatMessages"
        >
            <div className="chatMessages__header">
                <div className="chatMessages__header__person">
                    <img
                        src={currentChatPhoto}
                        className="chatMessages__header__person__icon"
                        alt="Profile Picture"
                    />
                    <p className="chatMessages__header__person__name">
                        {currentChatName}
                    </p>
                </div>
            </div>
            <div className="chatMessages__list">
                {messages.map((message) => {

                    return (
                        <div
                            className={`chatMessages__list__item ${
                                message.sender === userID
                                    ? 'chatMessages__list__item--me'
                                    : 'chatMessages__list__item--other'
                            }`}
                            key={message.time}
                        >
                            <div
                                className={
                                    message.sender === userID
                                        ? 'chatMessages__list__item__message chatMessages__list__item__message--me'
                                        : 'chatMessages__list__item__message'
                                }
                            >
                                <p className="chatMessages__list__item__message__text">
                                    {message.data}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="chatMessages__controllers">
                <div className="chatMessages__controllers__input">
                    <input
                        type="text"
                        placeholder="Введите сообщение"
                        className="chatMessages__input__field"
                        onInput={handleChange}
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="chatMessages__controllers__button"
                >
                    <svg
                        style={{ height: '31px', marginLeft: '6px' }}
                        viewBox="0 0 25 25"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="Layer_47" data-name="Layer 47">
                            <path
                                d="m5.15 12h17.41l-19.8-9a.53.53 0 0 0 -.55.09.5.5 0 0 0 -.13.54z"
                                fill="#000000"
                                style="fill: rgb(72, 74, 77);"
                            ></path>
                            <path
                                d="m5.15 13-3.07 8.33a.5.5 0 0 0 .13.54.55.55 0 0 0 .34.13.52.52 0 0 0 .21 0l19.8-9z"
                                fill="#000000"
                                style="fill: rgb(72, 74, 77);"
                            ></path>
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default withWebSocket(
    ChatMessages,
    'wss://api.jimder.ru/api/v1/openConnection',
);
