const ChatMessages = () => {
    const userID = 1;

    const messages = [
        {
            Data: 'Привет',
            Sender: 1,
            Receiver: 2,
            Time: '12:00',
        },
        {
            Data: 'Привет',
            Sender: 2,
            Receiver: 1,
            Time: '12:00',
        },
        {
            Data: 'Как дела?',
            Sender: 1,
            Receiver: 2,
            Time: '12:00',
        },
        {
            Data: 'Нормально',
            Sender: 2,
            Receiver: 1,
            Time: '12:00',
        },
    ];
    return (
        <div className="chatMessages">
            {/* <div className="chatMessages__header">
                <div className="chatMessages__header__person">
                    <p className="chatMessages__header__person__name">Иван</p>
                    <img
                        src="https://source.unsplash.com/random/150x150/?woman"
                        alt="Profile Picture"
                    />
                </div>
            </div> */}
            {/* <div className="chatMessages__list">
                <div className="chatMessages__list__item chatMessages__list__item--me">
                    <div className="chatMessages__list__item__message">
                        <p className="chatMessages__list__item__text">
                            Привет! Как дела?
                        </p>
                    </div>
                </div>
                <div className="chatMessages__list__item chatMessages__list__item--other">
                    <div className="chatMessages__list__item__message">
                        <p className="chatMessages__list__item__text">
                            Привет! Все хорошо, спасибо!
                        </p>
                    </div>
                </div>
                <div className="chatMessages__list__item chatMessages__list__item--me">
                    <div className="chatMessages__list__item__message">
                        <p className="chatMessages__list__item__text">
                            Чем занимаешься?
                        </p>
                    </div>
                </div>
                <div className="chatMessages__list__item chatMessages__list__item--other">
                    <div className="chatMessages__list__item__message">
                        <p className="chatMessages__list__item__text">
                            Смотрю фильм
                        </p>
                    </div>
                </div>
            </div> */}
            <div className="chatMessages__list">
                {messages.map((message) => (
                    <div
                        className={`chatMessages__list__item ${
                            message.Sender === userID
                                ? 'chatMessages__list__item--me'
                                : 'chatMessages__list__item--other'
                        }`}
                        key={message.id}
                    >
                        <div
                            className={
                                message.Sender === userID
                                    ? 'chatMessages__list__item__message chatMessages__list__item__message--me'
                                    : 'chatMessages__list__item__message'
                            }
                        >
                            <p className="chatMessages__list__item__text">
                                {message.Data}
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
                    />
                </div>
                <button className="chatMessages__controllers__button">
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
