import { useState, useEffect } from '../../../reactor';
import { getMessages } from '../../../features/chat/api';
import { store } from '../../../app/app';

const ChatMessages = () => {
    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        getMessages(2)
            .then((data) => {
                setMessages(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket(
            'ws://localhost:8080/api/v1/openConnection?uid=1',
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
                setMessages((prev) => [...prev, newMessage]);
            };
        }
    }, [ws]);

    const handleSubmit = () => {
        if (ws) {
            ws.send(
                JSON.stringify({
                    data: message,
                    sender: 1,
                    receiver: 2,
                    time: new Date().getTime(),
                }),
            );
            setMessage('');
        }
    };

    const [userID, setUserID] = useState(0);

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();
            console.log(state);
            setUserID(state.id);
        });
    }, []);

    console.log(userID);


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
