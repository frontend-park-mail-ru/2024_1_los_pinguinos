import { useState, useEffect } from '../../../reactor/index';
import { Link } from '../../../shared/routing/link';
import { clsx } from '../../../clsx/index';

const Footer = () => {
    const [activePath, setActivePath] = useState(window.location.pathname);

    useEffect(() => {
        const trackPath = () => {
            setActivePath(window.location.pathname);
        };
        window.addEventListener('popstate', trackPath);
        return () => {
            window.removeEventListener('popstate', trackPath);
        };
    }, []);

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
                <span style="font-size: x-large" className="icon-people"></span>
                <span className="nav__text">Мэтчи</span>
            </Link>
            <Link
                to="/chats"
                className={clsx(
                    'nav__item',
                    activePath === '/chats' && 'is-active',
                )}
            >
                <span
                    style="font-size: x-large"
                    className="icon-chat-text"
                ></span>
                <span className="nav__text">Чаты</span>
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

export default Footer;
