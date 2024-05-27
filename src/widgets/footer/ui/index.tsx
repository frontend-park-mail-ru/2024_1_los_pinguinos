import { useState, useEffect } from '../../../reactor/index';
import { Link } from '../../../shared/ui/link';
import { clsx } from '../../../shared/lib/clsx/index';
import { store } from '../../../app/app';
import withWebSocket from '../../../app/socket';
import './index.css';

const Footer = ({ socket, setSocket }) => {
    const [activePath, setActivePath] = useState(window.location.pathname);
    const [newMatches, setNewMatches] = useState(store.getState().newMatches);

    useEffect(() => {
        const trackPath = () => {
            setActivePath(window.location.pathname);
        };
        window.addEventListener('popstate', trackPath);
        return () => {
            window.removeEventListener('popstate', trackPath);
        };
    }, []);

    useEffect(() => {
        const unsubscribe = store.subscribe(
            (newMatches: string[]) => {
                setNewMatches(newMatches);
            },
            ['newMatches'],
        );

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.onmessage = (e) => {
                const message = JSON.parse(e.data);
                console.log('message in footer', message);
                if (
                    message.Type === 'match' &&
                    (message.Properties.receiver === store.getState().id ||
                        message.Properties.sender === store.getState().id)
                ) {
                    store.dispatch({
                        type: 'UPDATE_NEW_MATCH',
                        payload: message.Properties.receiver === store.getState().id ? message.Properties.sender : message.Properties.receiver,
                    });
                }
            };

            socket.onclose = () => {
                console.log('Socket closed, reopening...');
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

    return (
        <nav className="nav">
            <Link
                to="/main"
                className={clsx(
                    'nav__item',
                    activePath === '/main' && 'is-active',
                )}
            >
                <span
                    style="font-size: x-large"
                    className="icon-person-plus"
                ></span>
                <span className="nav__text">Карточки</span>
            </Link>
            <Link
                to="/matches"
                className={clsx(
                    'nav__item',
                    activePath === '/matches' && 'is-active',
                )}
            >
                <span
                    icon-after-text={
                        newMatches && newMatches.length > 0
                            ? newMatches.length
                            : ''
                    }
                    icon-after-type="badge bottom right"
                    style="font-size: x-large"
                    className="icon-people"
                ></span>
                <span className="nav__text">Мэтчи</span>
            </Link>
            <Link
                to="/chats"
                className={clsx(
                    'nav__item',
                    activePath === '/chats' && 'is-active',
                )}
                // onClick={() => {
                //     store.dispatch({
                //         type: 'UPDATE_CURRENT_CHAT',
                //         payload: null,
                //     });
                // }}
            >
                <span
                    onClick={() => {
                        store.dispatch({
                            type: 'UPDATE_CURRENT_CHAT',
                            payload: {
                                id: 0,
                                name: '',
                                photo: '',
                            },
                        });
                    }}
                    style="font-size: x-large"
                    className="icon-chat-text"
                ></span>
                <span
                    onClick={() => {
                        store.dispatch({
                            type: 'UPDATE_CURRENT_CHAT',
                            payload: {
                                id: 0,
                                name: '',
                                photo: '',
                            },
                        });
                    }}
                    className="nav__text"
                >
                    Чаты
                </span>
            </Link>
            <Link
                to="/profile"
                className={clsx(
                    'nav__item',
                    activePath === '/profile' && 'is-active',
                )}
            >
                <span
                    style="font-size: x-large"
                    className="icon-person-gear"
                ></span>
                <span className="nav__text">Настройки</span>
            </Link>
        </nav>
    );
};

export default withWebSocket(
    Footer,
    'wss://api.jimder.ru/api/v1/openConnection',
);
