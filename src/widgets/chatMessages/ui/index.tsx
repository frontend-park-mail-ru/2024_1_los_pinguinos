import { useEffect, useState } from '../../../reactor';
import withWebSocket from '../../../app/socket';
import { getMessages } from '../../../features/chat/api';
import { store } from '../../../app/app';
import { Button } from '../../../shared/ui';

const ChatMessages = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [userID, setUserID] = useState(store.getState().id);
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
        // console.log('currentChat', currentChat);
        if (!currentChat) {
            return;
        }
        getMessages(currentChat)
            .then((data) => {
                console.log(data);
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
            console.log('in Socket');
            console.log(socket.onmessage);
            socket.onmessage = (e) => {
                console.log('new Mesage in ChatMessages');
                const newMessage = JSON.parse(e.data);
                if (
                    (newMessage.sender === userID &&
                        newMessage.receiver === store.getState().currentChat) ||
                    (newMessage.sender === store.getState().currentChat &&
                        newMessage.receiver === userID) && newMessage.data != ''
                ) {
                    setMessages((prev) => [newMessage, ...prev]);
                }

                setTimeout(() => {
                    const chat = document.querySelector('.chatMessages__list');
                    if (chat) {
                        chat.scrollTop = chat.scrollHeight;
                    }
                }, 100);
            };
        }
    }, [socket]);

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
            // console.log({
            //     data: message,
            //     sender: store.getState().id,
            //     receiver: currentChat,
            //     time: new Date().getTime(),
            // });
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
                <button
                    onClick={() => {
                        store.dispatch({
                            type: 'UPDATE_CURRENT_CHAT',
                            payload: null,
                        });
                    }}
                    className="chatMessages__header__button"
                >
                    Назад
                </button>
            </div>
            <div className="chatMessages__list">
                {messages.map((message) => (
                    <div
                        className={`chatMessages__list__item ${
                            message.sender === userID
                                ? 'chatMessages__list__item--me'
                                : 'chatMessages__list__item--other'
                        }`}
                        key={message.id}
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
                ))}
            </div>

            <div className="chatMessages__controllers">
                <div className="chatMessages__controllers__input">
                    <input
                        type="text"
                        placeholder="Введите сообщение"
                        className="chatMessages__input__field"
                        onInput={handleChange}
                        onSubmit={handleSubmit}
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
