import { useEffect, useState } from '../../../reactor';
import { store } from '../../../app/app';
import Chatlist from '../../../features/chat/ui/chatlist';
/**
 * Компонент навигации по чатам
 * @returns { JSX.Element } - Возвращает JSX-разметку навигации по чатам
 */
const ChatNavbar = () => {
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
        store.getState().currentChat ? store.getState().currentChat.id : 0,
    );

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();
            setCurrentChat(
                state.currentChat ? state.currentChat.id : 0,
            );
        });
    }, []);

    useEffect(() => {
        if (!currentChat) {
            return;
        }
    }, [currentChat]);

    return (
        <div
            style={{
                display: currentChat ? 'none' : width > 896 ? 'none' : 'block',
            }}
            className="chatlist"
        >
            <Chatlist />
        </div>
    );
};

export default ChatNavbar;