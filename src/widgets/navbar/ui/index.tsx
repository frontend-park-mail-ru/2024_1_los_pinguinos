import { useEffect, useState } from '../../../reactor';
import { NavItem } from './navitem';
import { getChats } from '../../../features/chat/api';
import { store } from '../../../app/app';
import { Input } from '../../../shared/ui';

const Navbar = () => {
    const [search, setSearch] = useState('');
    const [chats, setChats] = useState([]);
    const [currentChats, setCurrentChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const user = store.getState();
    const defaultPhoto = 'https://los_ping.hb.ru-msk.vkcs.cloud/i.webp';
    const [userPhoto, setUserPhoto] = useState(
        user.photos && user.photos[0] && user.photos[0].url
            ? user.photos[0].url
            : defaultPhoto,
    );
    const [userName, setUserName] = useState(user.name);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const chatsData: any = await getChats();
                setCurrentChats(chatsData.chats);
                setChats(chatsData.chats);
            } catch {
                return;
            }
        };
        fetchChats();
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

    useEffect(() => {
        setCurrentChats(
            chats.filter((chat: any) => {
                return chat.name.includes(search) || search === '';
            }),
        );
    }, [search]);

    function remapChats(event: any) {
        console.log('REMAP CHATS');
        setSearch(event.target.value);
    }

    function resetReadOnly(event: any) {
        event.target.removeAttribute('readonly');
    }

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
                {Input({
                    type: 'text',
                    onInput: remapChats,
                    readonly: true,
                    value: search,
                    onFocus: resetReadOnly,
                })}
                <div className="navbar__menu__items">
                    {currentChats.map((chat, index) => (
                        <NavItem
                            chat={chat}
                            activeChat={activeChat}
                            setActiveChat={setActiveChat}
                        />
                    ))}
                    <p
                        style={{
                            display:
                                currentChats.length == 0 ? 'block' : 'none',
                            fontSize: '25px',
                            fontWeight: '800',
                            color: 'white',
                        }}
                    >
                        Нет чатов
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
