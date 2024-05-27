import { useEffect, useState } from '../../../reactor/index';
import { ButtonLink } from '../../../shared/ui/index';
import './index.css';
import { store } from '../../../app/app';
import withWebSocket from '../../../app/socket';

/**
 * Компонент хедера
 * @returns { JSX.Element } - Возвращает JSX-разметку хедера
 */
const Header = ({ socket, setSocket }) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const [newMatches, setNewMatches] = useState(store.getState().newMatches);

    useEffect(() => {
        const trackPath = () => {
            setCurrentPath(window.location.pathname);
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
                console.log('message in header', message);
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
        <div className="header">
            <div className="header__menu">
                <ButtonLink
                    to="/main"
                    label="Карточки"
                    severity={currentPath === '/main' ? 'fill' : 'outline'}
                    onClick={() => setCurrentPath('/main')}
                    fontSize="m"
                />
                <ButtonLink
                    to="/matches"
                    label="Мэтчи"
                    severity={currentPath === '/matches' ? 'fill' : 'outline'}
                    onClick={() => setCurrentPath('/matches')}
                    fontSize="m"
                    dataAfterText={
                        newMatches && newMatches.length > 0
                            ? `${newMatches.length}`
                            : ''
                    }
                    dataAfterType="badge top right"
                />
                <ButtonLink
                    to="/profile"
                    label="Настройки"
                    severity={currentPath === '/profile' ? 'fill' : 'outline'}
                    onClick={() => setCurrentPath('/profile')}
                    fontSize="m"
                />
            </div>
        </div>
    );
};

export default withWebSocket(
    Header,
    'wss://api.jimder.ru/api/v1/openConnection',
);
