import { useEffect, useState } from '../../../reactor';
import { Link } from '../../../shared/routing/link';
import { NavItem } from './navitem';
import { getChats } from '../../../features/chat/api';
import { store } from '../../../app/app';
import withWebSocket from '../../../app/socket';
import ChatList from '../../../features/chat/ui/chatlist';

const Navbar = ({ socket }) => {
    const [search, setSearch] = useState('');
    const [chats, setChats] = useState([]);
    const defaultPhoto = 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp';
    const user = store.getState();
    const [userPhoto, setUserPhoto] = useState(
        user.photos && user.photos[0] && user.photos[0].url
            ? user.photos[0].url
            : defaultPhoto,
    );
    // const [ws, setWs] = useState<WebSocket | null>(null);
    const [userName, setUserName] = useState(user.name);

    // useEffect(() => {
    //     store.subscribe(() => {
    //         const state = store.getState();
    //         console.log(state);
    //     });
    // }, []);

    // const [currentChat, setCurrentChat] = useState(
    //     store.getState().currentChat,
    // );

    // useEffect(() => {
    //     store.subscribe(() => {
    //         const state = store.getState();
    //         console.log(state);
    //         setCurrentChat(state.currentChat);
    //     });
    // }, []);

    // useEffect(() => {
    //     console.log('currentChat', currentChat);
    //     if (!currentChat) {
    //         return;
    //     }

    //     const newChats = chats.map((chat) => {
    //         if (chat.personID === currentChat) {
    //             return {
    //                 ...chat,
    //                 isNewMessage: false,
    //             };
    //         }
    //         return chat;
    //     });

    //     setChats(newChats);
    // }, [currentChat]);

    // useEffect(() => {
    //     getChats()
    //         .then((data) => {
    //             const chats = data.chats.map((chat) => {
    //                 return {
    //                     ...chat,
    //                     lastMessage: {
    //                         ...chat.lastMessage,
    //                         time: new Date(chat.lastMessage.time).getTime(),
    //                     },
    //                     isNewMessage: false,
    //                 };
    //             });
    //             console.log('chats', chats);
    //             setChats(chats);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);

    useEffect(() => {
        const unsubscribePhoto = store.subscribe(
            (photos: any) => {
                setUserPhoto(
                    photos && photos[0] && photos[0].url
                        ? photos[0].url
                        : defaultPhoto,
                );
            },
            ['photos'],
        );
        const unsubscribeName = store.subscribe(
            (name: string) => {
                setUserName(name);
            },
            ['name'],
        );

        return () => {
            unsubscribePhoto();
            unsubscribeName();
        };
    }, []);

    // useEffect(() => {
    //     console.log(socket);
    //     if (socket) {
    //         socket.addEventListener('message', handleMessage);
    //     }
    //     return () => {
    //         if (socket) {
    //             socket.removeEventListener('message', handleMessage);
    //         }
    //     };
    // }, [socket]);

    // const handleMessage = (event) => {
    //     console.log('Received message in Navbar:', event.data);
    //     const newMessage = JSON.parse(event.data);
    //     // newMessageInChats(newMessage);
    //     setChats((prev) => {
    //         const newChats = prev.map((chat) => {
    //             if (
    //                 (newMessage.sender === user.id &&
    //                     newMessage.receiver === chat.personID) ||
    //                 (newMessage.sender === chat.personID &&
    //                     newMessage.receiver === user.id)
    //             ) {
    //                 return {
    //                     ...chat,
    //                     lastMessage: newMessage,
    //                     isNewMessage:
    //                         newMessage.receiver === user.id ? true : false,
    //                 };
    //             }
    //             return chat;
    //         });
    //         console.log('newChats', newChats);
    //         return newChats;
    //     });
    // };

    // const [activeChat, setActiveChat] = useState(null);

    return (
        <div className="navbar">
            <div className="navbar__header">
                <div className="navbar__header__person">
                    <p className="navbar__header__person__name">{userName}</p>
                    <img
                        src={userPhoto}
                        alt="Profile Picture"
                        className="navbar__header__person__image"
                    />
                </div>
            </div>
            <div className="navbar__menu">
                <ChatList />
            </div>
        </div>
    );
};

export default withWebSocket(
    Navbar,
    'wss://api.jimder.ru/api/v1/openConnection',
);
