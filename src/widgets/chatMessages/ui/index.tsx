import { useState, useEffect } from '../../../reactor';
import { getMessages } from '../../../features/chat/api';
import { store } from '../../../app/app';

const ChatMessages = () => {
    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const [userID, setUserID] = useState(1);
    console.log('user', store.getState());
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
        getMessages(currentChat)
            .then((data) => {
                console.log(data);
                setMessages(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentChat]);

    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket(
            `ws://localhost:8080/api/v1/openConnection?uid=${userID}`,
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

    useEffect(() => {
        if (ws) {
            ws.onmessage = (e) => {
                console.log(e.data);
                const newMessage = JSON.parse(e.data);
                console.log(newMessage);
                console.log(userID, currentChat);
                if (
                    (newMessage.sender === userID &&
                        newMessage.receiver === store.getState().currentChat) ||
                    (newMessage.sender === store.getState().currentChat &&
                        newMessage.receiver === userID)
                ) {
                    setMessages((prev) => [...prev, newMessage]);
                }
            };
        }
    }, [ws]);

    const handleSubmit = () => {
        if (ws) {
            ws.send(
                JSON.stringify({
                    data: message,
                    sender: 1,
                    receiver: currentChat,
                    time: new Date().getTime(),
                }),
            );
            setMessage('');
            const input = document.querySelector(
                '.chatMessages__input__field',
            ) as HTMLInputElement;
            if (input) {
                input.value = '';
            }
        }
    };

    return (
        <div className="chatMessages">
            <div className="chatMessages__list">
                {messages.map((message) => (
                    <div
                        className={`chatMessages__list__item ${
                            message.sender === userID
                                ? 'chatMessages__list__item--me'
                                : 'chatMessages__list__item--other'
                        }`}
                        // key={message.id}
                    >
                        <div
                            className={
                                message.sender === userID
                                    ? 'chatMessages__list__item__message chatMessages__list__item__message--me'
                                    : 'chatMessages__list__item__message'
                            }
                        >
                            <p className="chatMessages__list__item__text">
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

export default ChatMessages;
