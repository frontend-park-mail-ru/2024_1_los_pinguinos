import { useEffect, useState } from '../../../reactor';
import { Link } from '../../../shared/routing/link';
import { getChats } from '../../../features/chat/api';
import { store } from '../../../app/app';
import Chatlist from '../../../features/chat/ui/chatlist';

const ChatNavbar = () => {
    // const [search, setSearch] = useState('');
    // const [chats, setChats] = useState([]);
    // const [ws, setWs] = useState<WebSocket | null>(null);
    // const user = store.getState();

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
    }, [currentChat]);

    // useEffect(() => {
    //     store.subscribe(() => {
    //         const state = store.getState();
    //         console.log(state);
    //     });
    // }, []);

    // useEffect(() => {
    //     const socket = new WebSocket(
    //         `wss://api.jimder.ru/api/v1/openConnection?uid=${user.id}`,
    //     );

    //     socket.onopen = () => {
    //         console.log('Connected');
    //         setWs(socket);
    //     };

    //     socket.onclose = () => {
    //         console.log('Disconnected');
    //     };

    //     return () => {
    //         socket.close();
    //     };
    // }, []);

    // useEffect(() => {
    //     if (ws) {
    //         ws.onmessage = (e) => {
    //             console.log(e.data);
    //             const newMessage = JSON.parse(e.data);

    //         };
    //     }
    // }, [ws]);

    // useEffect(() => {
    //     getChats()
    //         .then((data) => {
    //             console.log(data.chats);
    //             setChats(data.chats);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);

    // const [activeChat, setActiveChat] = useState(null);

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